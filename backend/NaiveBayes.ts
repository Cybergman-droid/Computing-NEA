class NaiveBayesClassifer {
	/* 
    Hypothesis - transactionCategory == the category we are testing
	Evidence - frequency of the tokenised word for that category

	Prior P(H) ==  how likely is this category to appear

	Likelihood P(E|H) == The sum of the frequency of each word in the description for that category

	P(E|¬H) == The sum of how often each word in the description appears in every other category

	The posterior represents our updated belief based on the evidence
	Posterior P(H|E) == (P(H)*P(E|H)) / (P(H)*P(E|H) + P(¬H)*P(E|¬H))
	In this context it represents how likely it is that the transaction belongs to the category we are testing
    */
}

export default NaiveBayesClassifer;
