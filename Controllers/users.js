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