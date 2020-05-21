//alert("waa#")
const regexName = /[^\w\s]+/g;
const regexLink = /^https?:\/\/*/g;
const regexDesc = /{*}/g;
const regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

let avatar = $("#avatar");
let firstName = $("#firstname");
let lastName = $("#lastname");
let about = $("#about");
let email = $("#email");
let admin = $("#admin");
let post = $("#post");
let enabled = {
	firstName:true,
	lastName:true,
	image:true,
	about:true,
	email:true,
	admin:true
};


function submitCtrl(){
	if(enabled.firstName && enabled.lastName && enabled.email && enabled.image && enabled.about && enabled.admin){
		post.prop('disabled', false)
			.removeClass("disabled");
	} else {
		post.prop('disabled', true)
			.addClass("disabled");
	}
}

avatar.on("input", function(){
	  
	if(!validLink(avatar.val())){
		avatar.attr("data-original-title", "Please enter a valid image URL")
			.tooltip('update')
			.tooltip('show');
		enabled.image=false;
	} else{
		avatar.tooltip('hide');
		enabled.image=true;
	}
	submitCtrl();  
});

firstName.on("input", function(){
	if(invalidName(firstName.val())){
		firstName.attr("data-original-title", "Only Aa-zZ, 0-9 and _ characters are valid for first name ")
			.tooltip('update')
			.tooltip('show');
		enabled.firstName=false;
	} else if(firstName.val().length == firstName.attr('maxlength')) {
		firstName.attr("data-original-title", "First name cannot be more than"+ firstName.attr('maxlength')+ " characters")
			.tooltip('update')
			.tooltip('show');
		enabled.firstName=false;
	} else {
		firstName.tooltip('hide');
		enabled.firstName=true;
	}
	 submitCtrl();
});

lastName.on("input", function(){
	if(invalidName(lastName.val())){
		lastName.attr("data-original-title", "Only Aa-zZ, 0-9 and _ characters are valid for last name ")
			.tooltip('update')
			.tooltip('show');
		enabled.lastName=false;
	} else if(lastName.val().length == lastName.attr('maxlength')) {
		lastName.attr("data-original-title", "Last name cannot be more than"+ lastName.attr('maxlength')+ " characters")
			.tooltip('update')
			.tooltip('show');
		enabled.lastName=false;
	} else {
		lastName.tooltip('hide');
		enabled.lastName=true;
	}
	 submitCtrl();
});

about.on("input", function(){
	if(invalidDesc(about.val())){
		about.attr("data-original-title", "Curly brackets '{}' symbol cannot be used in User description")
			.tooltip('update')
			.tooltip('show');
		enabled.about=false;
	}else if(about.val().length == about.attr('maxlength')) {
		about.attr("data-original-title", "User description cannot be more than" + about.attr('maxlength')+" characters")
			.tooltip('update')
			.tooltip('show');
		enabled.about=false;
	}else{
		about.tooltip('hide');
		enabled.about=true;
	}
	submitCtrl();
});

email.on("input", function(){
	if(!validEmail(email.val())){
		email.attr("data-original-title", "Please enter a valid Email")
			.tooltip('update')
			.tooltip('show');
		enabled.email=false;
	}else{
		email.tooltip('hide');
	
		enabled.email=true;
	}
	submitCtrl();
});

admin.on("input", function(){
	if(invalidName(admin.val())){
		admin.attr("data-original-title", "Curly brackets '{}' symbol cannot be used in admin code")
			.tooltip('update')
			.tooltip('show');
		enabled.admin=false;
	} else if(admin.val().length == admin.attr('maxlength')) {
		admin.attr("data-original-title", "Admin code cannot be more than" + admin.attr('maxlength')+" characters")
			.tooltip('update')
			.tooltip('show');
		enabled.admin=false;
	} else {
		admin.tooltip('hide');
		enabled.admin=true;
	}
	 submitCtrl();
});


function invalidName(input){
	//console.log(input.match(regexName));
	if(input.match(regexName)){
		return true;
	} else {
		return false;
	}
//	return regex.test(input);
}

function validLink(input){
	//console.log(input.match(regexLink));
	if(input.match(regexLink)){
		return true;
	} else {
		return false;
	}
//	return regex.test(input);
}

function invalidDesc(input){
	//console.log(input.match(regexDesc));
	if(input.match(regexDesc)){
		return true;
	} else {
		return false;
	}
//	return regex.test(input);
}

function validEmail(input){
	//console.log(input.match(regexEmail));
	if(input.match(regexEmail)){
		return true;
	} else {
		return false;
	}
}