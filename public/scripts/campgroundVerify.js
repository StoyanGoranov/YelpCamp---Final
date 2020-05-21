
const regexName = /[^\w\s]+/g;
const regexLink = /^https?:\/\/*/g;
const regexDesc = /{*}/g;

let name = $("#name");
let image = $("#image");
let description = $("#description");
let post = $("#post");
let enabled = {
	name:true,
	image:true,
	desc:true
};

name.on("input", function(){
	if(invalidName(name.val())){
		name.attr("data-original-title", "Only Aa-zZ, 0-9 and _ characters are valid for Campground name ")
			.tooltip('update')
			.tooltip('show');
		enabled.name=false;
	} else if(name.val().length == name.attr('maxlength')) {
		name.attr("data-original-title", "Campground name cannot be more than 50 characters")
			.tooltip('update')
			.tooltip('show');
		enabled.name=false;
	} else {
		name.tooltip('hide');
		enabled.name=true;
	}
	 submitCtrl();
});

image.on("input", function(){
	if(!validLink(image.val())){
		image.attr("data-original-title", "Please enter a valid image URL")
			.tooltip('update')
			.tooltip('show');
		enabled.image=false;
	} else{
		image.tooltip('hide');
		enabled.image=true;
	}
	submitCtrl();
})

description.on("input", function(){
	if(invalidDesc(description.val())){
		description.attr("data-original-title", " Curly brackets '{}' symbol cannot be used in Campground description")
			.tooltip('update')
			.tooltip('show');
		enabled.desc=false;
	}else{
		description.tooltip('hide');
	
		enabled.desc=true;
	}
	submitCtrl();
});

post.on("click", function(event){
	if(name.val()==""){
		event.preventDefault()
		name.attr("data-original-title", "Campground name is a required field")
			.tooltip('update')
		name.tooltip('show');
	} 
	if (image.val()==""){
		event.preventDefault()
		image.attr("data-original-title", "Image URL is a required field")
			.tooltip('update')
		image.tooltip('show');	   
	} 
	if (description.val()==""){
		event.preventDefault()
		description.attr("data-original-title", "Description is a required field")
			.tooltip('update')
		description.tooltip('show');
	}
});


function submitCtrl(){
	if(enabled.name && enabled.image && enabled.desc){
		post.prop('disabled', false)
			.removeClass("disabled");
	} else {
		post.prop('disabled', true)
			.addClass("disabled");
	}
}

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

