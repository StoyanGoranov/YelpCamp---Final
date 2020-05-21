const express = require ("express");
const router = express.Router();
const passport = require ("passport");
const User = require("../models/user");
const middleware = require ("../middleware");
const formVerify = require ("../middleware/dataVerify.js")


//ROOT
router.get("/", function(req, res){
	res.render("landing");
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handle login logic
router.post("/login", formVerify.sign, function(req, res, next){
	
	passport.authenticate("local", function(err, user, info){
		if(err){
			req.flash("error", info.message);
			res.redirect("/login");
			console.log(info);
			return next(err);
		}
		if(!user){
			req.flash("error", info.message);
			res.redirect("/login");
			console.log(info);
			return next(err);
		}
		req.logIn(user, function(err){
			if(err){return next(err)}
			req.flash("success", "Welcome back " + req.body.username+"!"); 
			if(req.body.lastPage == ""){
				return res.redirect("/users/"+user.id)
			} else{
				return res.redirect(req.body.lastPage);
			}
		});
	})(req, res, next);
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "See you later");
	res.redirect("campgrounds");
});


module.exports = router;