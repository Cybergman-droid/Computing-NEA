import { body } from "express-validator";

const categoryDropdownOptions = [
	"Groceries",
	"Transport",
	"Eating Out",
	"Shopping",
	"Entertainment",
	"Utilities",
	"Income",
	"Savings",
	"Subscriptions",
	"Miscellaneous",
];

// Defines the checks that will be run on the transaction object that is sent
export const singleTransactionValidator = [
	body("amount").isFloat().withMessage("Amount must be a number"),

	body("category")
		.isString()
		.notEmpty()
		.isIn(categoryDropdownOptions)
		.withMessage("Valid category is required"),

	body("description")
		.isString()
		.notEmpty()
		.withMessage("Description is required"),

	body("date").isISO8601().withMessage("Date must be a valid ISO date"),

	body("confidence")
		.optional()
		.isInt({ min: 0, max: 100 })
		.withMessage("Confidence must be between 0 and 100"),

	body("autoClassified")
		.isBoolean()
		.withMessage("auto_classified must be true or false"),
];
