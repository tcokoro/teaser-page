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


/*
 * Subscribe
 */

	bindSubmitButtonClicks('#modal-subscribe-button','#modalInput','#modal-subscribe-info');
	//bindSubmitButtonClicks('#subscribe-button', '#mail', '#subscribe-info');

	function bindSubmitButtonClicks(buttonId,inputId,infoId) {
		$(buttonId).click(function() {
			var input = $(inputId);
				if (input.val()) {
					earlySubscriber(input.val(), input, infoId);
				} else {
					if (inputId === '#modalInput') {
						$($("div.container-fluid.modal-content.sub-modal-container")[0]).css('height',190);
					}
					$(infoId).removeClass('hidden');
				}
		});	
	}

	

	function disablePageButtonsAndInputs() {
		$("#subscribeModalBtn").prop('disabled', true);
		$("#modal-subscribe-button").prop('disabled', true);
		$("#subscribe-button").prop('disabled', true);
		$("#mail").prop('disabled', true);
		$("#modalInput").prop('disabled', true);
	}

	function earlySubscriber(email, input, infoId) {
		if (!isEmail(email)) {
			$(infoId).text("Sorry mate, you need a valid email.");
			$(infoId).removeClass('hidden');
			input.focus();
			return;
		}

		$.get('/mail/'+email, function(data) {
			earlySubscriberCallback(data['msg'], input, infoId);	
		});
	}

	function earlySubscriberCallback(output, input, infoId) {
		$(infoId).addClass('hidden');
		input.val(output);
		disablePageButtonsAndInputs();
	}

	function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

});
