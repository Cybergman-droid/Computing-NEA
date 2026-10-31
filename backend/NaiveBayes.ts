import { Database } from "better-sqlite3";
import type {
	TrainingData,
	CategoryData,
	WordFrequency,
	CategoryScore,
} from "./types/ClassifierTypes";
type WordCount = { category: string; categoryTotal: number };

/* 
    Hypothesis - transactionCategory == the category we are testing
	Evidence - frequency of the tokenised word for that category

	Prior P(H) ==  how likely is this category to appear

	Likelihood P(E|H) == The sum of the frequency of each word in the description for that category

	P(E|¬H) == The sum of how often each word in the description appears in every other category

	The posterior represents our updated belief based on the evidence
	Posterior P(H|E) == (P(H)*P(E|H)) / (P(H)*P(E|H) + P(¬H)*P(E|¬H))
	In this context it represents how likely it is that the transaction belongs to the category we are testing based on the words in the description
    */

class NaiveBayesClassifer {
	// Private properties
	#db: Database;
	#trainingData: TrainingData[];
	#categories: string[];
	#categoryTotals: CategoryData;
	#vocabularySize: number;

	// Constructs a new instance of the classifier
	constructor(inDb: Database, inTrainingData: TrainingData[]) {
		this.#db = inDb;
		this.#trainingData = inTrainingData;
		this.#categories = [];
		this.#categoryTotals = {};
		this.#vocabularySize = 0;
	}

	// Gets all the category and count data from the word_counts table to prevent unecessary queries to the database
	getWordCountData(): CategoryData {
		// Uses GROUP BY to return the category and the number of words in that category
		const wordCountSelectStatement = `
		SELECT category, sum(count) AS categoryTotal
		FROM word_counts
		GROUP BY category
		`;
		const wordCountCategoriesSelectStatement = `
		SELECT category 	
		FROM word_counts
		GROUP BY category
		`;
		const vocabSizeSelectStatement = `
		SELECT COUNT(DISTINCT word) AS size FROM word_counts
		`;

		const wordCountData = this.#db
			.prepare(wordCountSelectStatement)
			.all() as WordCount[];

		const categoriesData = this.#db
			.prepare(wordCountCategoriesSelectStatement)
			.all() as Record<string, string>[];

		const vocabulary = this.#db.prepare(vocabSizeSelectStatement).all() as {
			size: number;
		}[];

		// Creates an object from the category totals, matching the category to its total
		let categoryTotals: CategoryData = {};
		for (let data of wordCountData) {
			categoryTotals[data.category] = data.categoryTotal;
		}
		console.log(categoryTotals);

		let categories: string[] = [];
		for (let data of categoriesData) {
			// console.log(data);
			categories.push(data.category);
		}
		console.log(categories);

		// Updates the objects attributes with the data retrieved from the database
		this.#vocabularySize = vocabulary[0].size;
		this.#categoryTotals = categoryTotals;
		this.#categories = categories;
		return categoryTotals;
	}

	// Splits the description into an array of words
	tokenise(description: string): string[] {
		const tokenisedDescription = description.split(" ");
		return tokenisedDescription;
	}

	train() {
		// The upsert statement updates the count if the category and count exist and creates a new row if it doesn't
		const wordCountsUpsertStatement = `
                INSERT INTO word_counts
				(word, category, count)
				VALUES (?, ?, 1)
                ON CONFLICT(word,category) DO
                UPDATE
                SET count = count + 1
            `;

		// Iterates over every transaction in the training data and upserts it into the database
		for (let trainingTransaction of this.#trainingData) {
			const tokenisedDescription = this.tokenise(
				trainingTransaction.description,
			);
			for (let word of tokenisedDescription) {
				this.#db
					.prepare(wordCountsUpsertStatement)
					.run(word, trainingTransaction.category);
			}
		}
		console.log("The model has been trained");
	}

	// Calculate the probability that a word belongs to a specific category
	calculateWordProbability(word: string, category: string) {
		const categoryTotal = this.#categoryTotals[category];

		// Selects the frequency of a word passed in, in the category passed in
		const wordFrequencyCountSelectStatement = `
		SELECT count FROM word_counts WHERE word = ? AND category = ?
		`;
		const frequencyCountData = this.#db
			.prepare(wordFrequencyCountSelectStatement)
			.all(word, category) as { count: number }[];
		console.log(frequencyCountData);

		const wordFrequency = frequencyCountData[0]?.count ?? 0;

		// Calculate the probability that a word appears in a category and applies laplace smoothing to guard aganist unseen words
		const wordProbability =
			(wordFrequency + 1) / (categoryTotal + this.#vocabularySize);
		const logWordProbability = Math.log(wordProbability);

		return logWordProbability;
	}

	// Calculates the probability of a transaction belonging to a category and returns an object of category and sum probability {category: sumProbability}
	scoreCategory(
		tokenisedDescription: string[],
		category: string,
	): Omit<CategoryScore, "confidence"> {
		// Calculates the prior which is how likely a category is to appear before considering the description
		const categoryTransactionCount = this.#trainingData.filter(
			(transaction) => transaction.category === category,
		).length;
		const logCategoryPrior = Math.log(
			categoryTransactionCount / this.#trainingData.length,
		);

		// Array to store the logProbabilities
		let logWordProbabilities: number[] = [logCategoryPrior];

		// Iterates over every word and calculates the probability that it belongs to a category and appends it to an array
		for (let word of tokenisedDescription) {
			const logWordProbability = this.calculateWordProbability(word, category);
			logWordProbabilities.push(logWordProbability);
		}

		// Sums up the logProbabilities
		const totalProbability = logWordProbabilities.reduce((total, value) => {
			return total + value;
		});

		return { category, totalProbability };
	}

	classify(description: string): CategoryScore {
		const tokenisedDescription = this.tokenise(description);

		// Calculates the probability of a transaction belonging to a category for every category and appends to an array
		let categoryScores: Omit<CategoryScore, "confidence">[] = [];
		for (let category of this.#categories) {
			const categoryScore = this.scoreCategory(tokenisedDescription, category);
			categoryScores.push(categoryScore);
		}

		if (categoryScores.length === 0) {
			throw new Error("Cannot classify without trained category data");
		}

		// Obtains the maximum of all the scores
		const maxScore = Math.max(
			...categoryScores.map((score) => score.totalProbability),
		);
		// Checks if it is a finite value
		if (!Number.isFinite(maxScore)) {
			throw new Error(
				"Cannot calculate confidence from invalid category scores",
			);
		}

		// Creates weights for every category
		const categoryWeights = categoryScores.map((score) =>
			Math.exp(score.totalProbability - maxScore),
		);
		const totalWeight = categoryWeights.reduce(
			(total, weight) => total + weight,
			0,
		);

		// Creates a confidence score for every category based on the weights
		const scoredCategories: CategoryScore[] = categoryScores.map(
			(score, index) => ({
				...score,
				confidence: (categoryWeights[index] / totalWeight) * 100,
			}),
		);

		// Sorts the categories and returns the highest scoring one
		scoredCategories.sort((a, b) => b.totalProbability - a.totalProbability);
		return scoredCategories[0];
	}

	updateWordCounts(description: string, category: string) {
		// Tokenises the description
		// Updates the word count of the corresponding category with the data

		// The upsert statement updates the count if the category and count exist and creates a new row if it doesn't
		const wordCountsUpsertStatement = `
                INSERT INTO word_counts
                (word,category)
                VALUES (?, ?)
                ON CONFLICT(word,category) DO
                UPDATE
                SET count = count + 1
            `;

		// Iterates over every transaction in the training data and inserts it into the database
		const tokenisedDescription = this.tokenise(description);
		for (let word of tokenisedDescription) {
			this.#db.prepare(wordCountsUpsertStatement).run(word, category);
		}
	}
}

export default NaiveBayesClassifer;
