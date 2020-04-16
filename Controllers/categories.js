const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Category = require("./../Models/category");


exports.getAllCategories = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	const categoryData = await Category.findAll();
	if(categoryData)
		responseData = {statusCode: 200, success: "Data has been fetched successfully.", error: "", data: categoryData};
	else
		responseData = {statusCode: 404, success: "", error: "No data found for the request."};

	response.status(responseData.statusCode).json(responseData);
}