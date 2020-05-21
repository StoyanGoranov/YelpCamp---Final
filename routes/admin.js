const express = require ("express");
const router = express.Router();
const User = require("../models/user");
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const Log = require("../models/log");
const middleware = require ("../middleware");

//SHOW ROUTEs
router.get("/campgrounds", middleware.isAdmin, function(req, res){
	let perPage = 20;
    let pageQuery = parseInt(req.query.page);
    let pageNumber = pageQuery ? pageQuery : 1;
    let noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.countDocuments({name: regex}).exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allCampgrounds.length < 1) {
                        noMatch = "No campgrounds match that query, please try again.";
                    }
                    res.render("admin/campgrounds", {
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
                    console.log(err);
                } else {
                   res.render("admin/campgrounds", {
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
	


router.get("/comments", middleware.isAdmin, function(req, res){
	let perPage = 30;
    let pageQuery = parseInt(req.query.page);
    let pageNumber = pageQuery ? pageQuery : 1;
    let noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Comment.find({text: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allComments) {
            Comment.countDocuments({text: regex}).exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allComments.length < 1) {
                        noMatch = "No comments match that query, please try again.";
                    }
                    res.render("admin/comments", {
                        comments: allComments,
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
        Comment.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allComments) {
            Comment.countDocuments().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                   res.render("admin/comments", {
                        comments: allComments,
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

router.get("/users", middleware.isAdmin, function(req, res){
	let perPage =Comment;
    let pageQuery = parseInt(req.query.page);
    let pageNumber = pageQuery ? pageQuery : 1;
    let noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        User.find({username: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allUsers) {
            User.countDocuments({username: regex}).exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allUsers.length < 1) {
                        noMatch = "No users match that query, please try again.";
                    }
                    res.render("admin/users", {
                        users: allUsers,
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
        User.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allUsers) {
            User.countDocuments().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                   res.render("admin/users", {
                        users: allUsers,
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

router.get("/logs", middleware.isAdmin, function(req, res){
	let perPage = 12;
    let pageQuery = parseInt(req.query.page);
    let pageNumber = pageQuery ? pageQuery : 1;
    let noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Log.find({name: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allLogs) {
            Log.countDocuments({name: regex}).exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allLogs.length < 1) {
                        noMatch = "No logs match that query, please try again.";
                    }
                    res.render("admin/logs", {
                        logs: allLogs,
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
        Log.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allLogs) {
            Log.countDocuments().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                   res.render("admin/logs", {
                        logs: allLogs,
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


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;