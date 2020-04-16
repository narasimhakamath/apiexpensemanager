const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userName: {type: String, required: true, unique: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: false},
	mailAddress: {type: String, required: false},
	password: {type: String, required: true}
});

const custom = require("./../custom");



userSchema.statics.createUser = async function(requestBody) {
	let responseData = {statusCode: 408, success: "", error: "The request timed out. Please try again."};

	if(requestBody) {

		const isError = await this.validateUserFields(requestBody);

		if(!isError) {
			delete requestBody['confirmPassword'];
			requestBody['password'] = await custom.hashPassword(requestBody['password']);
			requestBody['_id'] = new mongoose.Types.ObjectId();

			const iData = new this(requestBody);
			try {
				const userData = await iData.save();
				responseData = {statusCode: 201, success: "User has been created successfully.", error: "", data: userData};
			} catch(mongoError) {
				responseData = {statusCode: 500, success: "", error: mongoError};
			}
		} else {
			responseData = {statusCode: 403, success: "", error: isError};
		}
	} else {
		responseData = {statusCode: 405, success: "", error: "Something went wrong. Try again later."};
	}

	return responseData;
}

userSchema.statics.isValidUserName = async function(userName) {
	if(userName) {
		const userData = await this.findOne({userName: userName}).exec();
		if(!userData)
			return true;
	}

	return false;
}

userSchema.statics.validateUserFields = async function(requestBody) {
	if(requestBody) {

		if(requestBody['userName']) {
			const isValidUserName = await this.isValidUserName(requestBody['userName']);
			if(!isValidUserName)
				return "The username already exists in the system.";
		} else {
			return "Invalid request parameter.";
		}

		if(!requestBody['firstName'])
			return "The first name is mandatory.";

		if(requestBody['mailAddress']) {
			const isValidMail = await custom.validateMail(requestBody['mailAddress']);
			if(!isValidMail) {
				return "The provided mail address is not valid.";
			} else {
				const isMailUsed = await this.findOne({mailAddress: requestBody['mailAddress']}).exec();
				if(isMailUsed)
					return "Another account exists with the same mail address.";
			}
		}

		if(!requestBody['password'])
			return "The password is not entered";

		if(!requestBody['confirmPassword'])
			return "Please confirm the password.";

		if(requestBody['password'] != requestBody['confirmPassword'])
			return "The passwords do not match.";

	} else {
		return "Invalid request parameters.";
	}

	return "";
}

module.exports = mongoose.model("User", userSchema);
