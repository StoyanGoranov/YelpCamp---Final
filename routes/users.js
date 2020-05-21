const express = require ("express");
const router = express.Router();
const passport = require ("passport");
const User = require("../models/user");
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const Log = require("../models/log");
const middleware = require ("../middleware");
const formVerify = require ("../middleware/dataVerify.js");


//index route
router.get("/", function(req, res){
	let perPage = 9;
    let pageQuery = parseInt(req.query.page);
    let pageNumber = pageQuery ? pageQuery : 1;
	let noMatch = null;
	if (req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		//Get found user from DB
			User.find({username:regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allUsers){
				User.countDocuments({username: regex}).exec(function (err, count) {
					if(err){
						var	errLog = {
							log:err.stack,
							activity:{
								agent:"Error code: "+err.code,
								concerning:"error",
								action:"index user"
							}
						}
						saveLog(errLog);
						console.log(err);
						res.redirect("back");
					} else {

						if(allUsers < 1){
							noMatch = "No users match that query, please try again.";
						}
						res.render("users/index", {
							users: allUsers,
							current: pageNumber,
							pages: Math.ceil(count / perPage),
							noMatch:noMatch,
							search: req.query.search
						});
					}
				});
			});
		}else{
			//Get all users from DB
			User.find({}, function(err, allUsers){
				User.countDocuments().exec(function (err, count) {
					if(err){
						var	errLog = {
							log:err.stack,
							activity:{
								agent:"Error code: "+err.code,
								concerning:"error",
								action:"index user"
							}
						}
						saveLog(errLog);
						console.log(err);
					} else {
						res.render("users/index", {
							users: allUsers, 
							 current: pageNumber,
                        	pages: Math.ceil(count / perPage),
							noMatch:noMatch,
							search:false
						});
					}
				});
			});
		}
})

// ====================
// AUTH ROUTES
// ====================
//NEW ROUTEs
//show  user register form
router.get("/new", function(req, res){
	res.render("users/new");
});


//CREATE ROUTEs
//handle  user sign up logic
router.post("/new", formVerify.sign, function(req, res){
	var newUser = new User ({username: req.body.username});
	//eval(require('locus'))
	var newLog = {
		log:req.body.username,
		activity:{
			concerning:"user",
			action:"create"
		}
	}
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			var	errLog = {
				log:err.stack,
					activity:{
						agent:"Error code: "+err.code,
						concerning:"error",
						action:"create user"
					}
				}
			saveLog(errLog);
			req.flash("error", err.message);
			return res.redirect("back");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Succesfully signed you up! Welcome to YelpCamp "+ req.body.username + "!") ;
			if (req.body.lastPage == ""){
				res.redirect("/users/"+newUser.id)
			} else {
				saveLog(newLog);
				res.redirect(req.body.lastPage);
			}
		});
	});
});


//SHOW ROUTE
router.get("/:id", function (req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			var	errLog = {
				log:err.stack,
					activity:{
						agent:"Error code: "+err.code,
						concerning:"error",
						action:"show user"
					}
				}
			saveLog(errLog);
			console.log(err);
			req.flash("error", "An error occured in this request, please try again later");
			res.redirect("back");
		}else{
			Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
				if(err){
					console.log(err);
					req.flash("error", "An error occured in this request, please try again later");
					res.redirect("back");
				}
				res.render("users/show", {user:foundUser, campgrounds:campgrounds});
			});
			
		}
		
	});
});

//admin panel
router.get("/:id/admin", middleware.isAdmin ,function(req,res){
	res.render("admin");		   
});
//EDIT ROUTES
router.get("/:id/edit", middleware.checkProfileOwnership, function(req,res){
	User.findById(req.params.id, function(err, foundUser){
		res.render("users/edit", {user:foundUser});
	});
});
//UPDATE ROUTES
router.put("/:id", middleware.checkProfileOwnership, formVerify.user, function(req,res){
		var newLog = {
		log:"",
		activity:{
			agent:req.session.passport.user,
			concerning:"user",
			action:"update"
		}
	}
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			var	errLog = {
				log:err.stack,
					activity:{
						agent:"Error code: "+err.code,
						concerning:"error",
						action:"update user"
					}
				}
			saveLog(errLog);
			console.log(err);
			req.flash("error", "Failed to update profile, please try again later")
			//error log? 
			res.redirect(req.params.id);
		} else {
			if (req.body.user.avatar != foundUser.avatar){ 
				foundUser.avatar = req.body.user.avatar;
				newLog.log = newLog.log + "Changed avatar! ";
			}
			if (req.body.user.firstname != foundUser.firstname){ 
				foundUser.firstName = req.body.user.firstname;
				newLog.log = newLog.log + "Changed firstname! ";
			}
			if (req.body.user.lastname != foundUser.lastname){ 
				foundUser.lastName = req.body.user.lastname
				newLog.log = newLog.log + "Changed lastname! ";
			}
			if (req.body.user.about != foundUser.about) {
				foundUser.about = req.body.user.about
				newLog.log = newLog.log + "Changed about! ";
			}
			if (req.body.user.email != foundUser.email){ 
				foundUser.email = req.body.user.email
				newLog.log = newLog.log + "Changed email! ";
			}
			if (req.body.user.admin === "Idemandm0r3RIGHTS"){ 
				foundUser.isAdmin = true
				var newAdminLog = {
					log:req.body.user.username+" acquired admin permissions!",
					activity:{
						concerning:"user",
						action:"update"
					}
				}
				saveLog(newAdminLog);
			}
			
			foundUser.save();
			saveLog(newLog);
			res.redirect(req.params.id);
		}
	});
});
//change password form
router.get("/:id/changepassword", middleware.checkProfileOwnership ,function(req, res){
	res.render("users/changepassword");
});
//change password form submission
router.post("/:id", middleware.checkProfileOwnership, function(req,res){
	//nothing happens here yet 
});
//DESTROY ROUTE
router.delete("/:id", middleware.checkProfileOwnership, function(req,res){
	User.findById(req.params.id, function(err, deleteUser){
		if(err){
			var	errLog = {
				log:err.stack,
					activity:{
						agent:"Error code: "+err.code,
						concerning:"error",
						action:"delete user"
					}
				}
			saveLog(errLog);
			console.log(err);
			req.flash("error", "Delete unsuccesful");
			res.redirect("back");
			
		} else {
		var newLog = {
			log:deleteUser.username,
			activity:{
				agent:req.session.passport.user,
				concerning:"user",
				action:"delete"
			}
		}
			Campground.deleteMany({'author.id':deleteUser._id}, function(err){
				if(err){
					var	errLog = {
						log:err.stack,
							activity:{
								agent:"Error code: "+err.code,
								concerning:"error",
								action:"delete user-campgrounds"
							}
						}
					saveLog(errLog);
					console.log(err);
					req.flash("error", "An error occured in this request, please try again later");
					res.redirect("back");
				} else {
					Comment.deleteMany({'author.id':deleteUser._id}, function(err){
						if(err){
							var	errLog = {
								log:err.stack,
									activity:{
										agent:"Error code: "+err.code,
										concerning:"error",
										action:"delete user-comments"
									}
								}
							saveLog(errLog);
							console.log(err);
							req.flash("error", "An error occured in this request, please try again later");
							res.redirect("back");
						} else{
							User.deleteOne({_id:deleteUser._id}, function(err){
								if(err){
									var	errLog = {
										log:err.stack,
											activity:{
												agent:"Error code: "+err.code,
												concerning:"error",
												action:"delete user-user"
											}
										}
									saveLog(errLog);
									console.log(err);
									req.flash("error", "An error occured in this request, please try again later");
									res.redirect("back");
								} else{
									req.logout();
									req.flash("info", "Account deleted succesfully. We are sorry to see you go!");
									saveLog(newLog);
									res.redirect("/campgrounds");
								}	
							});				
						}			
					});
				}	 
			});
		}			
	});
});
			
function saveLog(log){
	Log.create(log, function(err){
		if(err){
			console.log(err);
		}
	})
}


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
