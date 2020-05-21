// ===============================
// 	COMMENTS ROUTES
// ===============================
const express = require("express");
const router =  express.Router({mergeParams: true});
const Campground = require ("../models/campground"); 
const Comment = require ("../models/comment");
const Log = require("../models/log");
const middleware = require ("../middleware");
const formVerify = require ("../middleware/dataVerify.js");


//COMMENT CREATE ROUTE
router.post("/", middleware.isLoggedIn, formVerify.comment, function(req, res){
	var newLog = {
		log:req.body.comment.text,
		activity:{
			concerning:"comment",
			action:"create"
		}
	}
	//lookup campgroung using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err || !campground){
			var	errLog = {
				log:err.stack,
					activity:{
						agent:"Error code: "+err.code,
						concerning:"error",
						action:"create comment"
					}
			}
			saveLog(errLog);
			req.flash("error", "Something went wrong");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//console.log(req.body.comment);
			//create a new comment
			Comment.create(req.body.comment, function(err, comment){
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
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.author.isAdmin = req.user.isAdmin;
					//save the comment
					comment.save();
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					//redirect to campground show page
					// console.log("Comment created: ");
					// console.log(comment);
					req.flash("success", "Successfully added comment")
					saveLog(newLog);
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});
	
//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, formVerify.comment,  function(req, res){
		var newLog = {
		log:req.body.comment.name,
		activity:{
			agent:req.session.passport.user, 
			concerning:"comment",
			action:"update"
		}
	}
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			var	errLog = {
				log:err.stack,
					activity:{
						agent:"Error code: "+err.code,
						concerning:"error",
						action:"update comment"
					}
			}
			saveLog(errLog);
			console.log(err);
			res.redirect("back");
		} else {
			saveLog(newLog);
			res.redirect("/campgrounds/" + req.params.id);	
		}
	});
});
//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err, removedComment){
		if(err){
			var	errLog = {
				log:err.stack,
					activity:{
						agent:"Error code: "+err.code,
						concerning:"error",
						action:"delete comment"
					}
			}
			saveLog(errLog);
			console.log(err);
			res.redirect("back")
		}
		var newLog = {
			log:removedComment.text,
			activity:{
				agent:req.session.passport.user,
				concerning:"comment",
				action:"delete"
			}
		}
		saveLog(newLog);
		req.flash("success", "Comment deleted successfuly")
		res.redirect("/campgrounds/" + req.params.id);
	});
});

function saveLog(log){
	Log.create(log, function(err){
		if(err){
			console.log(err);
		}
	})
}



module.exports = router;