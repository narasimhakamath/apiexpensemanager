const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./../Models/user");


exports.createUser = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(request['body']) {
		responseData = await User.createUser(request['body']);
	} else {
		responseData = {...responseData, error: "The request can not be processed."};
	}

	response.status(responseData.statusCode).json(responseData);
}


exports.getDetails = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(request.params['userID']) {
		const userData = await User.getDetails(request.params['userID']);
		if(userData)
			responseData = {statusCode: 200, success: "Data has been fetched successfully.", error: "", data: userData};
		else
			responseData = {statusCode: 404, success: "", reason: "No data found for the request."};
	} else {
		responseData = {statusCode: 403, success: "", error: "Invalid request parameter."};
	}

	response.status(responseData.statusCode).json(responseData);
}