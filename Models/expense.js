const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
	categoryID: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
	modeID: {type: mongoose.Schema.Types.ObjectId, ref: "Mode", required: true},
	amount: {type: Number, required: true, default: 0.00},
	comment: {type: String, required: false},
	isActive: {type: Boolean, default: true},
	createdAt: {type: Date, default: Date.now},
	__v: {type: Number, select: false}
});

const Category = require("./category");
const Mode = require("./mode");
const Mapping = require("./mapping");
const custom = require("./../custom");

expenseSchema.statics.createExpense = async function(requestBody, userID) {
	let responseData = {statusCode: 500, success: "", error: "Something went wrong. Try again"};

	if(requestBody) {
		const isError = await this.validateFields(requestBody, userID);

		if(!isError) {
			const iData = new this({_id: new mongoose.Types.ObjectId(), userID: userID, categoryID: requestBody['categoryID'], modeID: requestBody['modeID'], amount: requestBody['amount'], comment: requestBody['comment'], isActive: true});

			try {
				const expenseData = await iData.save();
				responseData = {statusCode: 201, success: "The expense has been created successfully.", error: "", data: expenseData};
			} catch(mongoError) {
				responseData = {statusCode: 403, success: "", error: mongoError};
			}
		} else {
			responseData = {statusCode: 403, success: "", error: isError};
		}
	} else {
		responseData = {statusCode: 403, success: "", error: "Could not process the request due to invalid request parameters."};
	}

	return responseData;
}

expenseSchema.statics.validateFields = async function(requestBody, userID) {
	let errorMessage = "";

	if(requestBody) {

		if(requestBody['categoryID']) {
			const categoryID = requestBody['categoryID'];
			const isValidCID = custom.isValidObjectID(categoryID);

			if(isValidCID) {
				const categoryMappingData = await Mapping.checkMappingExists("category", categoryID, userID);
				if(categoryMappingData) {
					if(!categoryMappingData['isEnabled']) {
						errorMessage = "The selected Category does not exist.";
					}
				} else {
					errorMessage = "Could not process the request since the Category does not exist.";
				}
			} else {
				errorMessage = "Could not process the request due to invalid category ID.";
			}
		} else {
			errorMessage = "Could not process the request since the Category is not passed.";
		}

		if(requestBody['modeID']) {
			const modeID = requestBody['modeID'];
			const isValidMID = custom.isValidObjectID(modeID);

			if(isValidMID) {
				const modeMappingData = await Mapping.checkMappingExists("mode", modeID, userID);
				if(modeMappingData) {
					if(!modeMappingData['isEnabled'])
						errorMessage = "The selected Mode does not exist.";
				} else {
					errorMessage = "Could not process the request since the Mode does not exist.";
				}
			} else {
				errorMessage = "Could not process the request due to invalid category ID.";
			}
		} else {
			errorMessage = "Could not process the request since the Mode is not passed.";
		}

		if(requestBody['amount'] == "" && isNaN(requestBody['amount']))
			errorMessage = "Could not proces the requet due to invalid amount.";
	} else {
		errorMessage = "Invalid request parameters.";
	}

	return errorMessage;
}

expenseSchema.statics.updateExpense = async function(expenseID, requestBody, userID) {

	let responseData = {statusCode: 500, success: "", error: "Something went wrong. Try again."};

	if(expenseID && (requestBody['categoryID'] || requestBody['modeID'] || requestBody['isActive'] || requestBody['comment'])) {

		const isValidEID = await custom.isValidObjectID(expenseID);
		if(isValidEID) {
			const expenseData = await this.findOne({_id: expenseID}).exec();
			if(expenseData) {

				if(expenseData['isActive']) {

					try {
						await this.findByIdAndUpdate(expenseID, {"$set": requestBody}).exec();
						responseData = {statusCode: 201, success: "The expense has been updated successfully.", error: ""};
					} catch(mongoError) {
						responseData = {statusCode: 403, success: "", error: mongoError};
					}
				} else {
					responseData = {statusCode: 403, success: "", error: "The request can not be processed as this expense has been deleted."};
				}
			} else {
				responseData = {statusCode: 404, success: "", error: "No data found to update"};
			}
		} else {
			responseData = {statusCode: 403, success: "", error: "The request could not be processed as the expense could not be found."};
		}
	} else {
		responseData = {statusCode: 403, success: "", error: "Could not process the request due to invalid request parameters."};
	}

	return responseData;
}

expenseSchema.statics.findByID = async function(expenseID, userID, queryFields) {
	const expenseData = await this.findOne({_id: expenseID, userID: userID}).select(queryFields).lean();
	return expenseData;
}

expenseSchema.statics.getExpenses = async function(limitTo, pageNumber, sortBy, userID) {
	const expensesData = await this.find({userID: userID}).limit(limitTo).skip((pageNumber - 1) * limitTo).sort({createdAt: sortBy}).lean().exec();
	return expensesData;
}


module.exports = mongoose.model("Expense", expenseSchema);