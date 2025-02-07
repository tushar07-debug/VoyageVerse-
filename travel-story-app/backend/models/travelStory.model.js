const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelStorySchema = new Schema({
	title: { type: String, requuired: true },
	story: { type: String, requuired: true },
	visitedLocation: { type: [String], default: [] },
	isFavourite: { type: Boolean, default: false },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	createdOn: { type: Date, default: Date.now },
	imageUrl: { type: String, required: true },
	visitedDate: { type: Date, required: true },
});

module.exports = mongoose.model('TravelStory', travelStorySchema);
