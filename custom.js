const validator = require("email-validator");
const bcrypt = require("bcrypt");



// Function to check if the provided mail address is valid.
exports.validateMail = async (mailAddress) => {
	if(mailAddress) {
		console.log("isValidMail:", validator.validate(mailAddress));
		return await validator.validate(mailAddress);
	}
	return false;
}

// Function to hash the password.
exports.hashPassword = async (password) => {
	const saltRounds = 10;
	if(password)
		return await bcrypt.hash(password, saltRounds);

	return "";
}