$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var user = button.data('user');   // Extract info from data-* attributes
  
  //console.log("Campground id: "+campground);
//use Id to access Destroy Campground Route
 $("#deleteUser").attr("action", "/users/"+user+"?_method=DELETE")
});

