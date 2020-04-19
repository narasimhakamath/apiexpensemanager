const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Expense = require("./../Models/expense");
const Category = require("./../Models/category");
const Mode = require("./../Models/mode");
const custom = require("./../custom");


exports.createExpense = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(request['body']) {
		responseData = await Expense.createExpense(request['body'], request['userData']['userID']);
	} else {
		responseData = {statusCode: 403, success: "", error: "The request could not be processed."};
	}

	response.status(responseData.statusCode).json(responseData);
}

exports.updateExpense = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};
	responseData = await Expense.updateExpense(request['params']['expenseID'], request['body'], request['userData']['userID']);
	response.status(responseData.statusCode).json(responseData);
}

exports.getDetailsByID = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	const expenseID = request['params']['expenseID'];
	if(expenseID) {
		const isValidEID = await custom.isValidObjectID(expenseID);
		if(isValidEID) {
			const expenseData = await Expense.findByID(expenseID, request['userData']['userID'], '_id categoryID modeID amount isActive comment');
			if(expenseData) {
				const categoryData = await Category.findByID(expenseData['categoryID'], 'name');
				const modeData = await Mode.findByID(expenseData['modeID'], 'name');

				if(categoryData)
					expenseData['categoryName'] = categoryData['name'];
				else
					expenseData['categoryName'] = "";

				if(modeData)
					expenseData['modeName'] = modeData['name'];
				else
					expenseData['modeName'] = "";
				
				delete expenseData['categoryID'];
				delete expenseData['modeID'];

				responseData = {statusCode: 200, success: "Data has been fetched successfully.", error: "", data: expenseData};
			} else {
				responseData = {statusCode: 404, success: "", error: "No data found for the request."};
			}
		} else {
			responseData = {statusCode: 403, success: "", error: "Invalid request to the expense ID parameter."};
		}
	} else {
		responseData = {statusCode: 403, success: "", error: "Invalid request parameters."};
	}

	response.status(responseData.statusCode).json(responseData);
}

exports.getExpenses = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	let limit = 10;
	if(request['query']['limit'])
		limit = request['query']['limit'];
	let page = 1;
	if(request['query']['page'])
		page = request['query']['page'];
	let sort = 1;
	if(request['query']['sort'] == 1 || request['query']['sort'] == -1)
		sort = request['query']['sort'];

	const expensesData = await (Expense.getExpenses(parseInt(limit), parseInt(page), parseInt(sort), request['userData']['userID'])).toObject();
	if(expensesData.length)
		responseData = {statusCode: 200, success: "Data has been fetched successfully.", error: "", data: expensesData};
	else
		responseData = {statusCode: 404, success: "", error: "No data found for this request."};

	response.status(responseData.statusCode).json(responseData);
}