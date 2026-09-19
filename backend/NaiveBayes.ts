import { Database } from "better-sqlite3";
import { TrainingData } from "./types/ClassifierTypes";
type WordCount = { word: string; category: string; count: number };

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

	// Constructs a new instance of the classifier
	constructor(inDb: Database, inTrainingData: TrainingData[]) {
		this.#db = inDb;
		this.#trainingData = inTrainingData;
	}

	// Gets all the data from the word_counts table to prevent unecessary queries to the database
	getWordCountData() {
		const wordCountSelectStatement = `SELECT * FROM word_counts`;
		const wordCountData = this.#db
			.prepare(wordCountSelectStatement)
			.all() as WordCount[];
		return wordCountData;
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

		// Iterates over every transaction in the training data and inserts it into the database
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

	calculateWordProbability(word: string, category: string) {
		// TODO calculate the probability that a word appears in a category
		// frequency of word in category / total frequency of words in that category
		// filter by category
		// calculate the total for loop and sum
		// calculate word probability and return log of the value
		// use group by to select the totals for each category
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
