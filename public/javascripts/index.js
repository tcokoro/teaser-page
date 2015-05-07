$(document).ready(function() {
	var fixedHeader = false;
	// Change the header styling when the user scrolls
	$(window).scroll(function(e) {
		if ($(window).scrollTop() < 20 ) {
			$("header").removeClass('scrolled-header');
			$("#subscribeModalMenu img").attr("src", "images/early_access_menu_wt.png");
		} else {
			$("header").addClass('scrolled-header');
			$("#subscribeModalMenu img").attr("src", "images/early_access_menu_blk.png");
		}
	});


	$("#subscribeModal").on('shown.bs.modal', function() {
		$("#modalInput").focus();
	});

	// Make sure info is hidden when modal is closed
	// Clear text
	$("#subscribeModal").on('hidden.bs.modal', function() {
		$("#modal-subscribe-info").addClass('hidden');
		$("#modalInput")[0].value = "";
	});


/*
 * Subscribe
 */

	bindSubmitButtonClicks('#modal-subscribe-button','#modalInput','#modal-subscribe-info');

	function bindSubmitButtonClicks(buttonId,inputId,infoId) {
		$(buttonId).click(function() {
			var input = $(inputId);
				if (input.val()) {
					earlySubscriber(input.val(), input, infoId);
				} else {
					$(infoId).text("Please enter your email address *");
					$(infoId).removeClass('hidden');
				}
		});
	}

	function earlySubscriber(email, input, infoId) {
		if (!isEmail(email)) {
			$(infoId).text("Sorry mate, you need a valid email *");
			$(infoId).removeClass('hidden');
			input.focus();
			return;
		}

		$.get('/mail/'+email, function(data) {
			earlySubscriberCallback(data['msg'], infoId);
		});
	}

	function earlySubscriberCallback(output,infoId) {
		$(infoId).removeClass("pg-heading hidden");
		$(infoId).text(output);
		setTimeout(function() {
			$("#subscribeModalBtn").click();
		}, 1000);
	}

	function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

});
