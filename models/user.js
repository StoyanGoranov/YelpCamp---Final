const mongoose = require ("mongoose"),
	  passportLocalMongoose = require ("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	
	avatar: {type:String, default: ""
			},
	defaultAvatar: {type:String, default:"https://www.pinclipart.com/picdir/big/43-431002_colored-icons-png-free-and-downloads-giraffe-head.png"},
	firstName: {type:String, default: ""},
	lastName: {type:String, default: ""},
	about: {type:String, default:""},
	email: {type:String, default:""},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);