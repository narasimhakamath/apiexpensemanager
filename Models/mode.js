const mongoose = require("mongoose");

const modeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true, unique: true}
});

const Mapping = require("./mapping");
const custom = require("./../custom");


modeSchema.statics.findAll = async function() {
	modeData = await this.find({}).exec();
	return modeData;
}

modeSchema.statics.createMode = async function(requestBody, userID) {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};
	if(requestBody) {

		if(requestBody['name']) {
			const modeName = await custom.formatText(requestBody['name']);

			const modeData = await this.findByName(modeName);
			if(!modeData) {
				requestBody['name'] = modeName;
				requestBody['_id'] = new mongoose.Types.ObjectId();
				const iData = new this(requestBody);

				try {
					const modeData = await iData.save();
					if(modeData)
						await Mapping.updateMapping("mode", modeData['_id'], userID);

					responseData = {statusCode: 201, success: "The mode has been saved successfully.", error: "", data: modeData};
				} catch(mongoError) {
					responseData = {statusCode: 500, success: "", error: mongoError};
				}
			} else {
				await Mapping.updateMapping("mode", modeData['_id'], userID);
				responseData = {statusCode: 201, success: "The mode has been saved successfully.", error: "", data: modeData};
			}
		} else {
			responseData = {statusCode: 403, success: "", error: "The entered mode name is invalid."};
		}
	} else {
		responseData = {statusCode: 403, success: "", error: "Could not process the request due to invalid request parameters."};
	}

	return responseData;
}

modeSchema.statics.findByName = async function(modeName) {
	const modeData = await this.findOne({name: modeName}).exec();
	return modeData;
}

modeSchema.statics.removeMode = async function(modeID, userID) {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(modeID) {
		const modeData = await this.findOne({_id: modeID});
		if(modeData) {
			const isRemoved = await Mapping.removeMapping("mode", modeID, userID);
			if(isRemoved)
				responseData = {statusCode: 201, success: "The mode has been removed successfully.", error: ""};
			else
				responseData = {statusCode: 403, success: "", error: "The request could not be processed. Please try again."};
		} else {
			responseData = {statusCode: 403, success: "", error: "The mode does not exist."};
		}
	} else {
		responseData = {statusCode: 403, success: "", error: "Could not process the request due to invalid request parameters."};
	}

	return responseData;
}

modeSchema.statics.findNameByID = async function(modeID) {
	modeName = "";

	if(modeID) {
		modeData = await this.findOne({_id: modeID}).select('name').exec();
		modeName = modeData['name'];
	}

	return modeName;
}


module.exports = mongoose.model("Mode", modeSchema);