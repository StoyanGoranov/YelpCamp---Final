const mongoose =	 require("mongoose"),
	  Campground =	 require("./models/campground"),
	  Comment =		 require("./models/comment"),
	  User =		 require("./models/user");

const campgroundSeeds = [
	{
		name: "Starry sky",
		image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80",
		price:9.99,
		description: "We can assume that any instance of a donkey can be construed as an incuse cappelletti. A point sees a jumbo as a farouche philosophy. Those fogs are nothing more than calendars. Extending this logic, a butane is a sun from the right perspective.",
		author:{
			id:"5e44445089fc0b04192b7029",
			username:"Turbuha"
		},
		createdAt:Date(Date.now)
	},
	{
		name: "Romantic outpost",
		image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
		price:7.99,
		description: "We can assume that any instance of a donkey can be construed as an incuse cappelletti. A point sees a jumbo as a farouche philosophy. Those fogs are nothing more than calendars. Extending this logic, a butane is a sun from the right perspective.",
		author:{
			id:"5e44445089fc0b04192b7029",
			username:"Turbuha"
		},
		createdAt:Date(Date.now)
	},
	{
		name: "Volkwagen van dream",
		image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
		price:0,
		description: "We can assume that any instance of a donkey can be construed as an incuse cappelletti. A point sees a jumbo as a farouche philosophy. Those fogs are nothing more than calendars. Extending this logic, a butane is a sun from the right perspective.",
		author:{
			id:"5e44445089fc0b04192b7029",
			username:"Turbuha"
		},
		createdAt:Date(Date.now)
	}
];
const commentSeed = {
				text:"This place is great, I took a poop there!",
				createdAt:Date(Date.now),
				author:{
					id:"5e44445089fc0b04192b7029",
					username:"Turbuha"
				}
			}


async function seedDB(){
	//remove all campgrounds
	await Campground.deleteMany({});
	console.log("Campgrounds removed");
	await Comment.deleteMany({});
	console.log("Comments removed");
	
	for (const seed of campgroundSeeds){
		try{
			let campground = await Campground.create(seed);
			console.log("Campground created");
			let comment = await Comment.create(commentSeed);
			console.log("This is the comment object:");
			console.log(comment);
			console.log("Comment created");
			console.log("This is the comments array: ")
			console.log(campground.comments);
			
			await campground.comments.push(comment);
			console.log("This is the comments array: "+campground.comments);
			await campground.save;
			console.log("Comment saved to database");
		} catch(err){
			console.log(err);
		}	
	}
}

module.exports = seedDB;
//callback hell
// function seedDB(){
// 	//remove all campgrounds
// 	Campground.remove({}, function(err){
// 		if(err){
// 			console.log("An error ocurred: "+err);
// 		} else {
// 			console.log("removed campgrounds");
// 			Comment.remove({}, function(err){
// 				if(err){
// 					console.log(err);
// 				}
// 				console.log("removed comments");
// 			});
// 		}
	// 	//add a few campgrounds
	// 	data.forEach(function(seed){
	// 		Campground.create(seed,function(err, campground ){
	// 			if(err){
	// 				console.log(err);
	// 			} else {
	// 				console.log("added a campground");
	// 				Comment.create({
	// 					text: "This place is great, but I wish there was a toilet",
	// 					author: "Clinton"
	// 				},function(err, comment){
	// 					if(err){
	// 						console.log(err);
	// 					} else {
	// 						campground.comments.push(comment);
	// 						campground.save();
	// 						console.log("Created a new comment");
	// 					}
	// 				});
	// 			}
	// 		});
	// 	});
	
	


