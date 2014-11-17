$(document).ready(function(){
	var fixedHeader = false;
	// Change the header styling when the user scrolls
	$(window).scroll(function(e){
		if ($(window).scrollTop() < 20 ){
			if (fixedHeader){
				$(".cover-pg-header")
					.css('background', 'transparent')
					.css('color', 'white')
					.css('border', '0')
				$("header .early-access-btn")
					.css('background', 'transparent')
					.css('color', 'white')
					.css('border', '2px solid white')
				fixedHeader = false;
			}

		} else {
			$(".cover-pg-header")
				.css('background-color', 'white')
				.css('color', 'black')
				.css('border-bottom', '2px solid rgb(230, 230, 230)')
			$("header .early-access-btn")
				.css('background-color', 'rgb(219,68,55)')
				.css('border', '0')

			fixedHeader = true;
		}
		console.log("scroll from top: ", $(window).scrollTop());
	});

});