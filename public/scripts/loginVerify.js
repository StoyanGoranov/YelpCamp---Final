let username = $("#username");
let pass = $("#password");
let post = $("#post");


username.on("keypress", function(){
	if(username.val!=""){
		username.tooltip('hide');
	}
});

pass.on("keypress", function(){
	if(pass.val()!=""){
		pass.tooltip('hide');
	}
});


post.on("click", function(event){
	if(username.val()==""){
		event.preventDefault();
		username.tooltip('show');
	}
	if(pass.val()==""){
		event.preventDefault();
		pass.tooltip('show');
	}
	$("#lastPage").val(sessionStorage.last_page)
});



// $('#commentForm').submit(function(){ //listen for submit event
//     $.each(params, function(i,param){
//         $('<input />').attr('type', 'hidden')
//             .attr('name', param.name)
//             .attr('value', param.value)
//             .appendTo('#commentForm');
//     });

//     return true;
// });

// var form=document.getElementById('form-id');//retrieve the form as a DOM element

//     var input = document.createElement('input');//prepare a new input DOM element
//     input.setAttribute('name', inputName);//set the param name
//     input.setAttribute('value', inputValue);//set the value
//     input.setAttribute('type', inputType)//set the type, like "hidden" or other

//     form.appendChild(input);//append the input to the form

//     form.submit();//send with added input