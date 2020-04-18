const mongoose = require("mongoose");

const mappingSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	entity: {type: String, required: true},
	entityID: {type: mongoose.Schema.Types.ObjectId, required: true},
	userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
	isEnabled: {type: Boolean, default: true}
});

const custom = require("./../custom");


mappingSchema.statics.updateMapping = async function(entity, entityID, userID) {
	const mappingData = await this.findOne({entity: entity, entityID: entityID, userID: userID});

	if(mappingData) {
		if(!mappingData['isEnabled'])
			await this.findByIdAndUpdate(mappingData['_id'], {isEnabled: true}).exec();
	} else {
		let iData = {_id: new mongoose.Types.ObjectId(), entity: entity, entityID: entityID, userID: userID, isEnabled: true};
		iData = new this(iData);
		await iData.save();
	}
}

mappingSchema.statics.removeMapping = async function(entity, entityID, userID) {
	let isRemoved = false;
	const mappingData = await this.findOne({entity: entity, entityID: entityID, userID: userID});

	if(mappingData) {
		let isUpdated = await this.findByIdAndUpdate(mappingData['_id'], {isEnabled: false}).exec();
		if(isUpdated)
			isRemoved = true;
	}

	return isRemoved;
}

mappingSchema.statics.getEntitiesForUser = async function(entity, userID) {
	const mappingData = await this.find({entity: entity, userID: userID, isEnabled: true}).select('_id entityID').exec();
	return mappingData;
}

mappingSchema.statics.checkMappingExists = async function(entity, entityID, userID) {
	mappingData = await this.findOne({entity: entity, entityID: entityID, userID: userID}).exec();
	return mappingData;
}


module.exports = mongoose.model("Mapping", mappingSchema);
