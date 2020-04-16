const validator = require("email-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


// Function to check if the provided mail address is valid.
exports.validateMail = async (mailAddress) => {
	if(mailAddress)
		return await validator.validate(mailAddress);
	return false;
}

// Function to hash the password.
exports.hashPassword = async (password) => {
	const saltRounds = 10;
	if(password)
		return await bcrypt.hash(password, saltRounds);
	return "";
}

// Function to check if the Object ID is valid or not.
exports.isValidObjectID = async (objectID) => {
	if(objectID)
		return await mongoose.Types.ObjectId.isValid(objectID);
	return false;
}