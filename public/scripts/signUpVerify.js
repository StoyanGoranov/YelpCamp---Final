

const regex = /[^\w]+/g;

let username = $("#username");
let pass = $("#password");
let post = $("#post");


//keyup event
username.on("input", function(){
	// console.log(username.val());
	//correct username input?
	if(invalidUsername(username.val())){
		//false - submit disabled, show tooltip
		username.attr("data-original-title", "Only Aa-zZ, 0-9 and _ characters are valid for Username ")
				.tooltip('update')
				.tooltip('show');
		post.prop('disabled', true)
			.addClass("disabled");
	} else {
		//true - submit enabled, hide tooltip
		username.tooltip('hide');
		post.prop('disabled', false)
			.removeClass("disabled");
	}
});

pass.on("input",function(){
	if(pass.val()!=""){
		pass.tooltip('hide');
	}
});


post.on("click", function(event){
	if(username.val()==""){
		event.preventDefault();
		username.attr("data-original-title", "Username cannot be empty")
				.tooltip('update')
				.tooltip('show');
	} else {
		username.tooltip('hide')
	}
	if(pass.val()==""){
		event.preventDefault();
		pass.tooltip('show');
	} else {
		pass.tooltip('hide');
	}
	
	$("#lastPage").val(sessionStorage.last_page)
});



function invalidUsername(input){
	//console.log(input.match(regex));
		if(input.match(regex)){
		return true;
	} else {
		return false;
	}
//	return regex.test(input);
}
