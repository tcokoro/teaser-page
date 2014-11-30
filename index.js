$(document).ready(function(){
	var fixedHeader = false;
	// Change the header styling when the user scrolls
	$(window).scroll(function(e){
		if ($(window).scrollTop() < 20 ){
			$("header").removeClass('scrolled-header');
		} else {	
			$("header").addClass('scrolled-header');
		}
		
		// Handle Parallax Scrolling
		console.log('general info: ', $(".general-info-pg").scrollTop());
		console.log('available locations: ', $(".available-locations-container").scrollTop());
	});

});