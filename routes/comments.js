// ===============================
// 	COMMENTS ROUTES
// ===============================
const express = require("express");
const router =  express.Router({mergeParams: true});
const Campground = require ("../models/campground"); 
const Comment = require ("../models/comment");
const middleware = require ("../middleware");

//COMMENT NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err || !campground){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});	
		}
	});
	
});
//COMMENT CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup campgroung using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err || !campground){
			req.flash("error", "Something went wrong");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//console.log(req.body.comment);
			//create a new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save the comment
					comment.save();
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					//redirect to campground show page
					console.log(comment);
					req.flash("success", "Successfully added comment")
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});
//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
			console.log(err);
			res.redirect("/campground/:id");
		} else {
			res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
		}
	});
	
});
//COMMENT UPDATE ROUTE
	router.put("/:comment_id", middleware.checkCommentOwnership,  function(req, res){
		Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
			if(err){
				console.log(err);
				res.redirect("back");
			} else {
				res.redirect("/campgrounds/" + req.params.id);	
			}
		});
	});
//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err);
			res.redirect("back")
		}
		res.redirect("/campgrounds/" + req.params.id);
	})
});



module.exports = router;