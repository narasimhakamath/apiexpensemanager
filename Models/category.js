const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true, unique: true}
});

const Mapping = require("./mapping");
const custom = require("./../custom");


categorySchema.statics.findAll = async function() {
	categoryData = await this.find({}).exec();
	return categoryData;
}

categorySchema.statics.createCategory = async function(requestBody, userID) {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};
	if(requestBody) {

		if(requestBody['name']) {
			const categoryName = await custom.formatText(requestBody['name']);

			const categoryData = await this.findByName(categoryName);
			if(!categoryData) {
				requestBody['name'] = categoryName;
				requestBody['_id'] = new mongoose.Types.ObjectId();
				const iData = new this(requestBody);

				try {
					const categoryData = await iData.save();
					if(categoryData)
						await Mapping.updateMapping("category", categoryData['_id'], userID);

					responseData = {statusCode: 201, success: "The category has been saved successfully.", error: "", data: categoryData};
				} catch(mongoError) {
					responseData = {statusCode: 500, success: "", error: mongoError};
				}
			} else {
				await Mapping.updateMapping("category", categoryData['_id'], userID);
				responseData = {statusCode: 201, success: "The category has been saved successfully.", error: "", data: categoryData};
			}
		} else {
			responseData = {statusCode: 403, success: "", error: "The entered category name is invalid."};
		}
	} else {
		responseData = {statusCode: 403, success: "", error: "Could not process the request due to invalid request parameters."};
	}

	return responseData;
}

categorySchema.statics.findByName = async function(categoryName) {
	const categoryData = await this.findOne({name: categoryName}).exec();
	return categoryData;
}

categorySchema.statics.findByID = async function(categoryID, queryFields) {
	const categoryData = await this.findOne({_id: categoryID}).select(queryFields).lean().exec();
	return categoryData;
}

categorySchema.statics.removeCategory = async function(categoryID, userID) {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(categoryID) {
		const categoryData = await this.findOne({_id: categoryID});
		if(categoryData) {
			const isRemoved = await Mapping.removeMapping("category", categoryID, userID);
			if(isRemoved)
				responseData = {statusCode: 201, success: "The category has been removed successfully.", error: ""};
			else
				responseData = {statusCode: 403, success: "", error: "The request could not be processed. Please try again."};
		} else {
			responseData = {statusCode: 403, success: "", error: "The category does not exist."};
		}
	} else {
		responseData = {statusCode: 403, success: "", error: "Could not process the request due to invalid request parameters."};
	}

	return responseData;
}

categorySchema.statics.findNameByID = async function(categoryID) {
	categoryName = "";

	if(categoryID) {
		categoryData = await this.findOne({_id: categoryID}).select('name').exec();
		categoryName = categoryData['name'];
	}

	return categoryName;
}


module.exports = mongoose.model("Category", categorySchema);