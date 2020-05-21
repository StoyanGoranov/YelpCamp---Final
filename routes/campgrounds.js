const express = require("express");
const router = express.Router(); 
const Campground = require ("../models/campground");
const Log = require("../models/log");
const middleware = require ("../middleware");
const formVerify = require ("../middleware/dataVerify.js")

//INDEX ROUTE
router.get("/", function(req, res){
	let perPage = 8;
    let pageQuery = parseInt(req.query.page);
    let pageNumber = pageQuery ? pageQuery : 1;
    let noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.countDocuments({name: regex}).exec(function (err, count) {
                if (err) {
					var	errLog = {
						log:err.stack,
						activity:{
							agent:"Error code: "+err.code,
							concerning:"error",
							action:"index campground"
						}
					}
					saveLog(errLog);
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allCampgrounds.length < 1) {
                        noMatch = "No campgrounds match that query, please try again.";
                    }
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search
                    });
                }
            });
        });
    } else {
        // get all campgrounds from DB
        Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.countDocuments().exec(function (err, count) {
                if (err) {
					var	errLog = {
						log:err.stack,
						activity:{
							agent:"Error code: "+err.code,
							concerning:"error",
							action:"index campground"
						}
					}
					saveLog(errLog);
                    console.log(err);
                } else {
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: false
                    });
                }
            });
        });
    }
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});
//CREATE ROUTE
router.post("/", middleware.isLoggedIn, formVerify.campground, function(req, res){
	//get data from form and add campgrounds array
	// var name = req.body.name;
	// var price = req.body.price;
	// var image = req.body.image;
	// var desc = req.body.description;
	req.body.campground.author = {
		id: req.user._id,
		username: req.user.username
	}
	
	var newCampground = req.body.campground;
	var newLog = {
		log:req.body.campground.name,
		activity:{
			concerning:"campground",
			action:"create"
		}
	}
	//create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			var	errLog = {
				log:err.stack,
				activity:{
					agent:"Error code: "+err.code,
					concerning:"error",
					action:"create campground"
				}
			}
			saveLog(errLog);
			console.log(err);
		} else {
			//redirect back to campgrounds page
			//console.log(newlyCreated);
			saveLog(newLog);
			res.redirect("/campgrounds/"+ newlyCreated._id);
		}
	});
});

//SHOW ROUTE
router.get("/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			var	errLog = {
				log:err.stack,
				activity:{
					agent:"Error code: "+err.code,
					concerning:"error",
					action:"show campground"
				}
			}
			saveLog(errLog);	
			console.log(err);
		} else {
			// console.log("have comments been populated");
			// console.log(foundCampground.populated("comments"));
			// console.log(foundCampground);
			// console.log("Comments are:")
			// console.log(foundCampground.comments);
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
		
	});
});
//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership,formVerify.campground, function(req, res){
		var newLog = {
		log:req.body.campground.name,
		activity:{
			agent:req.session.passport.user,
			concerning:"campground",
			action:"update"
		}
	}
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			var	errLog = {
				log:err.stack,
				activity:{
					agent:"Error code: "+err.code,
					concerning:"error",
					action:"update campground"
				}
			}
			saveLog(errLog);
			res.redirect("/campgrounds");
			console.log(err);
		} else {
			//save log
			saveLog(newLog)
			//redirect to show
			res.redirect("/campgrounds/" + updatedCampground._id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){

	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
		if(err){
			var	errLog = {
				log:err.stack,
				activity:{
					agent:"Error code: "+err.code,
					concerning:"error",
					action:"delete campground"
				}
			}
			saveLog(errLog);
			console.log(err);
		}
		var newLog = {
			log:campgroundRemoved.name,
				activity:{
					agent:req.session.passport.user,
					concerning:"campground",
					action:"delete"
				}
		}
			//remove comments
			Campground.deleteMany({ id: {$in: campgroundRemoved.comments}}, function(err){
				if(err){
					var	errLog = {
						log:err.stack,
						activity:{
							agent:"Error code: "+err.code,
							concerning:"error",
							action:"delete campground comments"
						}
					}
					saveLog(errLog);
					console.log(err);
				} else {
					req.flash("success", "Campground deleted successfully!")
					saveLog(newLog)
					res.redirect ("/campgrounds");
				}
			
			});
			
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
