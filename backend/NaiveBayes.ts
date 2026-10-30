import { Database } from "better-sqlite3";
import type {
	TrainingData,
	CategoryData,
	WordFrequency,
	CategoryScore
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

	// Constructs a new instance of the classifier
	constructor(inDb: Database, inTrainingData: TrainingData[]) {
		this.#db = inDb;
		this.#trainingData = inTrainingData;
		this.#categories = [];
		this.#categoryTotals = {};
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
		const wordCountData = this.#db
			.prepare(wordCountSelectStatement)
			.all() as WordCount[];

		const categoriesData = this.#db
			.prepare(wordCountCategoriesSelectStatement)
			.all() as Record<string, string>[];
		// console.log(categoriesData);

		// Creates an object from the category totals, matching the category to its total
		let categoryTotals: CategoryData = {};
		for (let data of wordCountData) {
			// console.log(data);
			categoryTotals[data.category] = data.categoryTotal;
		}
		console.log(categoryTotals);

		let categories: string[] = [];
		for (let data of categoriesData) {
			// console.log(data);
			categories.push(data.category);
		}
		console.log(categories);

		// Shows that the totals can be accsecd using the categories retrieved from the database as a key
		for (let category of categories) {
			console.log(category);
			console.log(categoryTotals[category]);
		}

		// Updates the objects attributes with the data retrieved from the database
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
	}

	// Calculate the probability that a word belongs to a specific category
	calculateWordProbability(word: string, category: string) {
		// Selects the frequency of a word passed in for every category
		const wordFrequencyCountSelectStatement = `
			SELECT category, sum(count) AS frequency
			FROM word_counts
			WHERE word = ?
			GROUP BY category
		`;
		const frequencyCountData = this.#db
			.prepare(wordFrequencyCountSelectStatement)
			.all(word) as Record<string, number>[];

		// Creates an object from the frequencyCountData, matching the category to the frequency of the word in that category
		let wordFrequency: WordFrequency = {};
		for (let data of frequencyCountData) {
			wordFrequency[data.category] = data.frequency;
		}
		console.log(wordFrequency);

		// Calculate the probability that a word appears in a category and returns the log of that value returns 0 if the word dosen't appear in thr category
		if (!wordFrequency[category]) {
			return 0;
		}

		const wordProbability =
			wordFrequency[category] / this.#categoryTotals[category];
		const logWordProbability = -Math.log(wordProbability);

		return logWordProbability;
	}

	// Calculates the probability of a transaction belonging to a category and returns an object of category and sum probability {category: sumProbability}
	scoreCategory(tokenisedDescription: string[], category: string):CategoryScore {
		// Array to store the logProbabilities
		let logWordProbabilities: number[] = [];

		// Iterates over every word and calculates the probability that it belongs to a category and appends it to an array
		for (let word of tokenisedDescription) {
			const logWordProbability = this.calculateWordProbability(word, category);
			logWordProbabilities.push(logWordProbability);
		}

		// Sums up the logProbabilities
		const totalProbability = logWordProbabilities.reduce((total, value) => {
			return total + value;
		});

		return {category: category, totalProbability: totalProbability};
	}

	classify(description: string) {
		const tokenisedDescription = this.tokenise(description);

		let categoryScores = [];
		for (let category of this.#categories) {
			const categoryScore: CategoryScore = this.scoreCategory(tokenisedDescription, category);
			categoryScores.push(categoryScore);
		}

		categoryScores.sort((a, b) => a.totalProbability - b.totalProbability)

		// Scores the categories
		// Returns the category with the highest category
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
