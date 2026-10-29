import { Database } from "better-sqlite3";
import type {
	TrainingData,
	CategoryData,
	WordFrequency,
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
		console.log(categoriesData);

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
		console.log(frequencyCountData);

		// Creates an object from the frequencyCountData, matching the category to the frequency of the word in that category
		let wordFrequency: WordFrequency = {};
		for (let data of frequencyCountData) {
			wordFrequency[data.category] = data.frequency;
		}
		console.log(wordFrequency);

		// TODO calculate the probability that a word appears in a category
		// frequency of word in category / total frequency of words in that category
		// filter by category
		// calculate the total for loop and sum
		// calculate word probability and return log of the value
	}

	scoreCategory(description: string, category: string) {
		// TODO calculate the sum of the word probabilities in the category
	}

	classify(description: string) {
		// Tokenise description
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
