const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Category = require("./../Models/category");
const Mapping = require("./../Models/mapping");


exports.getAllCategories = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	const categoryData = await Category.findAll();
	if(categoryData)
		responseData = {statusCode: 200, success: "Data has been fetched successfully.", error: "", data: categoryData};
	else
		responseData = {statusCode: 404, success: "", error: "No data found for the request."};

	response.status(responseData.statusCode).json(responseData);
}

exports.createCategory = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(request['body']) {
		responseData = await Category.createCategory(request['body'], request['userData']['userID']);
	} else {
		responseData = {statusCode: 403, success: "", error: "The request could not be processed."};
	}

	response.status(responseData.statusCode).json(responseData);
}

exports.removeCategory = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(request['params']['categoryID']) {
		responseData = await Category.removeCategory(request['params']['categoryID'], request['userData']['userID']);
	} else {
		responseData = {statusCode: 403, success: "", error: "The request could not be processed."};
	}

	response.status(responseData.statusCode).json(responseData);
}

exports.getCategoriesForUser = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	const entityData = await Mapping.getEntitiesForUser("category", request['userData']['userID']);
	if(entityData.length) {
		let categoriesData = [];
		for(let i = 0; i < entityData.length; i++) {
			const entityName = await Category.findNameByID(entityData[i]['entityID']);
			categoriesData.push({_id: entityData[i]['_id'], entityID: entityData[i]['entityID'], entityName: entityName});
		}

		responseData = {statusCode: 201, success: "Data has been fetched successfully.", error: "", data: categoriesData};
	} else {
		responseData = {statusCode: 404, success: "", error: "No data found for this request."};
	}

	response.status(responseData.statusCode).json(responseData);
}