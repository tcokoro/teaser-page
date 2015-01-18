$(document).ready(function(){
	var fixedHeader = false;
	// Change the header styling when the user scrolls
	$(window).scroll(function(e){
		if ($(window).scrollTop() < 20 ){
			$("header").removeClass('scrolled-header');
			$("#subscribeModalMenu img").attr("src", "images/early_access_menu_wt.png");
		} else {	
			$("header").addClass('scrolled-header');
			$("#subscribeModalMenu img").attr("src", "images/early_access_menu_blk.png");
		}
	});


	$("#subscribeModal").on('shown.bs.modal', function(){
		$("#modalInput").focus();
	});
});
