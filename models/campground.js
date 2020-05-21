const mongoose = require("mongoose");


//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
	name: {
		type: String,
		required: "Campground name cannot be blank"
	},
	price: String,
	image: String,
	description: {
		type: String,
		required: "Campground description cannot be blank"
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	createdAt:{
		type:Date,
		default: Date.now
	}
	,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Campground", campgroundSchema);
