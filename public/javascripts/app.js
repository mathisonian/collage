var isOn = true;

function insertIframe() {
	if($("#embedText").val().trim() != "") {
		$(".media-container").append("<div class='media'>" + $("#embedText").val() + "</div>");
		$(".media").last().children(":first").addClass("video");
		$(".media").last().draggable().resizable();
		$("#embedText").val("");
		$(".close-reveal-modal").click();
	}
	if($("#imgText").val().trim() != "") {
		$(".media-container").append("<div class='media'><img src='" + $("#imgText").val() + "'/></div>");
		$(".media").last().children(":first").addClass("pic");
		$(".media").last().draggable().resizable();
		$("#imgText").val("");
		$(".close-reveal-modal").click();
	}
}

function toggleVideoControls() {
    if(isOn) {
    	$('.video').each(function(index) {
			$(this).css("z-index", "1");
		});
    	$("#control").text("On");
    	isOn = false;
    } else {
    	$('.video').each(function(index) {
			$(this).css("z-index", "-1");
		});
    	$("#control").text("Off");
    	isOn = true;
    }
}

function save() {
	$.ajax({
	  type: "POST",
	  url: "/save",
	  data: { collage : {html: $(".media-container").html()}}
	});
}

/* Foundation v2.2 http://foundation.zurb.com */
jQuery(document).ready(function ($) {
	$.lastClicked = false;
	$(document).keydown(function(e) {
	    var code = (e.which) ? e.which : e.keyCode;
	    var inChar = String.fromCharCode(code);
	    if(code == 46 || code == 8) {
	    	e.preventDefault();
			$(".selected").css('visibility','hidden');
	    	$(".selected").addClass("deleted");
	    	$(".selected").children().each(function(index) {
	    		$(this).remove();
	    	});
	    	$(".selected").removeClass("selected");	    
	    }
	    else if (inChar ==  " ") {
/* 	        e.preventDefault(); */
	        toggleVideoControls();
		} else if(code === 187) {
			if(!$.lastClicked) return;
			$(".selected").children(":first").css("opacity", parseFloat($(".selected").children(":first").css("opacity")) + 0.05);
		} else if(code === 189) {
			if(!$.lastClicked) return;			
			$(".selected").children(":first").css("opacity", parseFloat($(".selected").children(":first").css("opacity")) - 0.05);
		}/* else if(code === 90) {
			e.preventDefault();
		} else if(code === 88) {
			e.preventDefault();
			var index = $($.lastClicked).index();
			$($.lastClicked).css("visibility", "hidden");
			$(".media-container").children().eq(index+1).css("visibility", "hidden");
			if(index < $(".media-container").children().length - 1) {
				$($.lastClicked).insertAfter($(".media-container").children().eq(index+1));
			}
			$(".media-container").addClass()
		}*/
	});
	$(".media").draggable().resizable();
	$(document).click(function(e) {
	    e = e || event;	    
    	$.lastClicked = e.target || e.srcElement;
	    // TODO: Implement this
	    if($($.lastClicked).hasClass("selected")) {
	    	$($.lastClicked).removeClass("selected")
	    } else if($($.lastClicked).hasClass("media")) {
	    	$(".selected").removeClass("selected")
	    	$($.lastClicked).addClass("selected")
	    }
	});

	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
				contentLocation = $tab.attr("href") + 'Tab';

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

    	//Show Tab Content
		$(contentLocation).closest('.tabs-content').children('li').hide();
		$(contentLocation).css('display', 'block');
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
	  $(this).closest(".alert-box").fadeOut(function(event){
	    $(this).remove();
	  });
	});


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	$('input, textarea').placeholder();

	/* TOOLTIPS ------------ */
	$(this).tooltips();


	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
//	$('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
//	$('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
//	$('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
//	$('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});



	/* DROPDOWN NAV ------------- */

	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});
  if (Modernizr.touch) {
    $('.nav-bar>li.has-flyout>a.main').css({
      'padding-right' : '75px'
    });
    $('.nav-bar>li.has-flyout>a.flyout-toggle').css({
      'border-left' : '1px dashed #eee'
    });
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    })
  }


	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */
});
