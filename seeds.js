const mongoose =	 require("mongoose"),
	  Campground =	 require("./models/campground"),
	  Comment =		 require("./models/comment");

const data = [
	{
		name: "Starry sky",
		image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80",
		description: "We can assume that any instance of a donkey can be construed as an incuse cappelletti. A point sees a jumbo as a farouche philosophy. Those fogs are nothing more than calendars. Extending this logic, a butane is a sun from the right perspective."
	},
	{
		name: "Romantic outpost",
		image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
		description: "We can assume that any instance of a donkey can be construed as an incuse cappelletti. A point sees a jumbo as a farouche philosophy. Those fogs are nothing more than calendars. Extending this logic, a butane is a sun from the right perspective."
	},
	{
		name: "Volkwagen van dream",
		image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
		description: "We can assume that any instance of a donkey can be construed as an incuse cappelletti. A point sees a jumbo as a farouche philosophy. Those fogs are nothing more than calendars. Extending this logic, a butane is a sun from the right perspective."
	},
]


function seedDB(){
	//remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log("An error ocurred: "+err);
		} else {
			console.log("removed campgrounds");
			Comment.remove({}, function(err){
				if(err){
					console.log(err);
				}
				console.log("removed comments");
			});
		}
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
	
	
	});
}

module.exports = seedDB;