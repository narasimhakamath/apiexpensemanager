const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true, unique: true}
});


categorySchema.statics.findAll = async function() {
	categoryData = await this.find({}).exec();
	return categoryData;
}

categorySchema.statics.createCategory = async function(requestBody) {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(requestBody['name']) {
		requestBody['_id'] = new mongoose.Types.ObjectId();
		const iData = new this(requestBody);

		try {
			const categoryData = await iData.save();
			responseData = {statusCode: 201, success: "Category has been created successfully.", error: "", data: categoryData};
		} catch(mongoError) {
			responseData = {statusCode: 500, success: "", error: mongoError};
		}
	} else {
		responseData = {statusCode: 403, success: "", error: "Invalid request parameters."};
	}

	return responseData;
}



module.exports = mongoose.model("Category", categorySchema);