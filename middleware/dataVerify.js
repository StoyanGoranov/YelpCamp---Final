const Campground = require ("../models/campground"),
	  Comment 	 = require ("../models/comment"),
	  User 		 = require ("../models/user");
var middlewareObj = {};


const regexName = /[^\w]+/g;
const regexNumber = /[^\d]+/g;
const regexLink = /^https?:\/\/*/g;
const regexDesc = /{*}/g;
const regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

middlewareObj.campground = function (req, res, next){
	
	if(invalidName(req.body.campground.name) || invalidLink(req.body.campground.image || req.body.campground.description == "" || invalidDesc(req.body.campground.description)) || invalidPrice(req.body.campground.price)){
		console.log("Invalid input!")
		req.flash("error", "Bad request!");
		return res.redirect("back");
	} else {
		next()
	}
}

middlewareObj.comment = function (req, res, next){
	//console.log(req.body.comment)
	if(req.body.comment.text == "" || invalidDesc(req.body.comment.text)){
		console.log("Invalid input!")
		req.flash("error", "Bad request!");
		return res.redirect("back");
	} else {
		next()
	}
}

middlewareObj.user = function (req, res, next){
	if(invalidName(req.body.user.firstname) || invalidName(req.body.user.lastname) || invalidLink(req.body.user.avatar) || invalidDesc(req.body.user.about) || invalidEmail(req.body.user.email) || (req.body.user.admin && req.body.user.admin.length) > 36){
		console.log("Invalid input!")
		req.flash("error", "Bad request!");
		return res.redirect("back");
	} else {
		next()
	}
}

middlewareObj.sign = function (req, res, next){
	if(invalidName(req.body.username) || req.body.password == ""){
		console.log("Invalid input!")
		req.flash("error", "Bad request!");
		return res.redirect("back");
	} else {
		next()
	}
}

function invalidName(input){
	//console.log(input.match(regexName));
	if(input.match(regexName)){
		console.log("Invalid name is true");
		return true;
	} else {
		return false;
	}
//	return regex.test(input);
}

function invalidPrice(input){
	//console.log(input.match(regexNumber));
	if(input.match(regexNumber)){
		console.log("Invalid name is true");
		return true;
	} else {
		return false;
	}
}

function invalidLink(input){
	console.log(input.match(regexLink));
	if(input.match(regexLink)){
		console.log("Invalid link is true");
		return false;
	} else {
		return true;
	}
//	return regex.test(input);
}

function invalidDesc(input){
	//console.log(input.match(regexDesc));
	if(input.match(regexDesc)){
		return true;
		console.log("Invalid descripti is true");
	} else {
		return false;
	}
//	return regex.test(input);
}

function invalidEmail(input){
	//console.log(input.match(regexEmail));
	if(input.match(regexEmail) || !input){
		return false;
	} else {
		console.log("Invalid email is true");
		return true;
	}
}






module.exports = middlewareObj