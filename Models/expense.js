const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
	categoryID: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
	modeID: {type: mongoose.Schema.Types.ObjectId, ref: "Mode", required: true},
	amount: {type: Number, required: true, default: 0.00}
});

const Mapping = require("./mapping");
const custom = require("./../custom");



module.exports = mongoose.model("Expense", expenseSchema);