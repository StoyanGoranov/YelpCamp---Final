const express 		= require("express"),
	  app 			= express(),
	  bodyParser 	= require("body-parser"),
	  mongoose 		= require("mongoose"),
	  flash			= require("connect-flash"),
	  passport		= require("passport"),
	  LocalStrategy	= require("passport-local"),
	  methodOverride = require("method-override"),
	  passportLocalMongoose = require ("passport-local-mongoose"),
	  Campground 	= require("./models/campground"),
	  Comment		= require("./models/comment"),
	  User			= require("./models/user"),
	  seedDB		= require("./seeds");
	 
const campgroundRoutes = require("./routes/campgrounds"),
	  commentRoutes = require ("./routes/comments"),
	  indexRoutes = require ("./routes/index");
	  


// connect to database

//console.log(process.env.DATABASEURL);
mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false
}).then(() =>{
	console.log("Connected to DB");
}).catch(err =>{
	console.log("ERROR: ", err.message);
});
// use body parser in order to succesfully retrieve info from a get request
app.use(bodyParser.urlencoded({extended: true}));
//use public directory for front-end resources
app.use(express.static(__dirname + "/public"));
//set default engine of fron-end files to ejs
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the DB

//Passport config
app.use(require("express-session")({
	secret:"picikurchi",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.info = req.flash("info");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

const port = process.env.PORT || 3000;
app.listen(port,function(){
	console.log("YelpCamp server started! ");
	console.log("working in v13Deployed!");
	console.log("Production version1.0");
	
	
});