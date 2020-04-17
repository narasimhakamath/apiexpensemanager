const validator = require("email-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRounds = 10;

// Function to check if the provided mail address is valid.
exports.validateMail = async (mailAddress) => {
	if(mailAddress)
		return await validator.validate(mailAddress);
	return false;
}

// Function to hash the password.
exports.hashPassword = async (password) => {
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

// Function to compare plain text password to hashed password.
exports.comparePasswords = async (password, hashedPassword) => {
	if(password)
		return await bcrypt.compare(password, hashedPassword);
	return false;
}

// Function to trim unnecessary white spaces and capitalize the first alphabet of every word in a text.
exports.formatText = async(textData) => {
	let returnString = "";
	if(textData != "") {
		returnString = textData.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		returnString = returnString.trim();
		returnString = returnString.replace(/ +(?= )/g,'');
	}

	return returnString;
}