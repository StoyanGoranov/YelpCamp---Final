const regexDesc = /{*}/g;
let commentNew = $("#commentNew");
let commentEdit = $("#commentEdit");
let post = $("#post");
let postEdit = $("#postEdit")
// add event listeners
	//remove currently edited comment from view
$(".editButton").on('click',function(event){
	console.log(event);
	var button = $(event.currentTarget)
	var commentId = button.data('commentid');
	console.log("CommentId: "+commentId);
	$("#comment"+commentId).toggleClass('hidden', 1500);
			   
});
//use IDs to access Destroy Comment Route
$('#staticBackdrop').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var comment = button.data('comment') // Extract info from data-* attributes
  var campground = button.data('campground');
  
  // console.log("Comment id: "+comment);
  // console.log("Campground id: "+campground);

 $("#deleteComment").attr("action", "/campgrounds/"+campground+"/comments/"+comment+"?_method=DELETE")
});

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var campground = button.data('campground');   // Extract info from data-* attributes
  
  //console.log("Campground id: "+campground);
//use Id to access Destroy Campground Route
 $("#deleteCampground").attr("action", "/campgrounds/"+campground+"?_method=DELETE")
});

//add focus to new comment

// comment tooltip
commentNew.on("input", function(){
	console.log(commentNew.val())
	console.log(commentNew.val().length == commentNew.attr("maxlength"))
	if(invalidDesc(commentNew.val())){
		commentNew.attr("data-original-title", " Curly brackets '{}' symbol cannot be used in Comment")
			.tooltip('update')
			.tooltip('show');
		post.prop('disabled', true)
			.addClass("disabled")
	}else{
		commentNew.tooltip('hide');
		post.prop('disabled', false)
			.removeClass("disabled");
	}
	if(commentNew.val().length == commentNew.attr("maxlength")){
		commentNew.attr("data-original-title", "Comment cannot be more than "+commentNew.attr("maxlength") +" characters")
			.tooltip('update')
			.tooltip('show');
	} 
});

commentEdit.on("input", function(){
	if(invalidDesc(commentEdit.val())){
		commentEdit.attr("data-original-title", " Curly brackets '{}' symbol cannot be used in Campground description")
			.tooltip('update')
			.tooltip('show');
		postEdit.prop('disabled', true)
			.addClass("disabled");
		
	}else{
		commentEdit.tooltip('hide');
		postEdit.prop('disabled', false)
			.removeClass("disabled");
	}
	if(commentEdit.val().length == commentEdit.attr("maxlength")){
		commentEdit.attr("data-original-title", "Comment cannot be more than "+commentEdit.attr("maxlength") +" characters")
			.tooltip('update')
			.tooltip('show');
	} 
});
post.on("click", function(event){
	if(commentNew.val()==""){
		event.preventDefault()
		commentNew.attr("data-original-title", "Comment cannot be blank")
		.tooltip('update')
		.tooltip('show');
	   }
})
postEdit.on("click", function(event){
	if(commentEdit.val()==""){
		event.preventDefault()
		commentEdit.attr("data-original-title", "Comment cannot be blank")
		.tooltip('update')
		.tooltip('show');
	   }
})

function invalidDesc(input){
	//console.log(input.match(regexDesc));
	if(input.match(regexDesc)){
		return true;
	} else {
		return false;
	}
//	return regex.test(input);
}