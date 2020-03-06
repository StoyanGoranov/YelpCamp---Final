const express = require ("express");
const router = express.Router();
const passport = require ("passport");
const User = require("../models/user");



//ROOT
router.get("/", function(req, res){
	res.render("landing");
});

// ====================
// AUTH ROUTES
// ====================
//show register form
router.get("/register", function(req, res){
	res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User ({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp "+ req.body.username);
			res.redirect("/campgrounds");
		});
	});
});
//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handle login logic
router.post("/login", function(req, res, next){
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
			return res.redirect("/campgrounds"); 
		});
	})(req, res, next);
});
//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged You Out");
	res.redirect("campgrounds");
});


module.exports = router;