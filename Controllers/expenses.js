const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Expense = require("./../Models/expense");


exports.createExpense = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(request['body']) {
		responseData = await Expense.createExpense(request['body'], request['userData']['userID']);
	} else {
		responseData = {statusCode: 403, success: "", error: "The request could not be processed."};
	}

	response.status(responseData.statusCode).json(responseData);
}
