const express = require("express");
const router = express.Router(); 
const Campground = require ("../models/campground");
const middleware = require ("../middleware");


//INDEX ROUTE
router.get("/", function(req, res){
	let noMatch = null;
	if (req.query.search){
				const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		//Get all campgrounds from DB
			Campground.find({name:regex}, function(err, allCampgrounds){
				if(err){
					console.log(err);
				} else {
					
					if(allCampgrounds < 1){
						noMatch = "No campgrounds match that query, please try again.";
					}
					res.render("campgrounds/index", {campgrounds: allCampgrounds, noMatch:noMatch});
				}
			});
		}else{
			//Get all campgrounds from DB
			Campground.find({}, function(err, allCampgrounds){
				if(err){
					console.log(err);
				} else {
					res.render("campgrounds/index", {campgrounds: allCampgrounds, noMatch:noMatch});
				}
			});
		}
	
	
});
//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});
//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
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
	//create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

//SHOW ROUTE
router.get("/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			console.log(err);
		} else {
			console.log("have comments been populated");
			console.log(foundCampground.populated("comments"));
			console.log(foundCampground);
			console.log("Comments are:")
			console.log(foundCampground.comments);
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
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
			console.log(err);
		} else {
			//redirect to show
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
		if(err){
			console.log(err);
		} else {
			//remove comments
			Campground.deleteMany({ id: {$in: campgroundRemoved.comments}, function(err){
				if(err){
					console.log(err);
				} else {
					res.redirect ("/campgrounds");
				}
			}
			});
			
		}
	});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = router;
