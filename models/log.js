const mongoose = require ("mongoose");
	
const LogSchema = new mongoose.Schema({
	log:String,
	activity:{
		agent:{
			type:String,
			default:"default"
		},
		concerning:String,
		action:String
	},
	createdAt:{
		type:Date,
		default: Date.now
	}
});



module.exports = mongoose.model("Log", LogSchema);