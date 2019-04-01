(function($) {
	var menuHoverTimeout = 0;

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows()
			);
		}
	};

	$(document).ready(function() {
		initMainMenu();

		initMobileMenu();

		initPopups();

		initCountriesPopup();

		initSignupLoginPopups();

		initPhotoGalleries();

		initItineraries();

		initItineraryPage();

		initExtendableBlocks();

		initDatePickers();

		initVTabs();

		initScrollTopButton();

		initScrollAnimation();

		$(window).scroll(onScroll);

		$(window).resize(onResize);

		setTimeout(function() {
			onResize();
		}, 50);
	});

	function initItineraryHeaderEdit() {
		$(".btn-edit-title").click(function() {
			$(this)
				.closest(".box")
				.addClass("edit")
				.find(".title")
				.prop("contenteditable", true); //.focus();
			setEndOfContenteditable(
				$(this)
					.closest(".box")
					.find(".title")
					.get(0)
			);
		});

		$(".btn-stop-edit").click(function() {
			$(this)
				.closest(".box")
				.removeClass("edit")
				.find(".title")
				.prop("contenteditable", false);
		});
	}

	function initAddChoisePopup() {
		$(".popup-item .custom-add").click(function() {
			$(".popup-add-choise").addClass("show");
			$("body").addClass("no-scroll");
			return false;
		});
	}

	function initAddDetailsPopup() {
		if (jQuery().styler) {
			$("input[type=file].stylized").styler({
				locale: "en"
			});
		}

		$(".popup .add-details").click(function() {
			$(this)
				.closest(".popup")
				.removeClass("show");

			$(".popup-add-details").addClass("show");

			var currentDataContainerClass = $(".popup-item.show").attr(
				"data-details"
			);
			// console.log (currentDataContainerClass);

			$(".popup-add-details .form-details").removeClass("show");
			$(".popup-add-details ." + currentDataContainerClass).addClass("show");

			$("body").addClass("no-scroll");
			return false;
		});
	}

	function initCustomAddTitles() {
		$(".popup-item").each(function(index, element) {
			var val = $(element)
				.find(".choice-block input[type=radio]")
				.val();
			$(element)
				.find(".proposals .depended-content")
				.removeClass("show");
			$(element)
				.find(".proposals .depended-content[data-value=" + val + "]")
				.addClass("show");
		});

		$(".popup .choice-block input[type=radio]").change(function() {
			$(this)
				.closest(".popup")
				.find(".proposals .depended-content")
				.removeClass("show");
			$(this)
				.closest(".popup")
				.find(".proposals .depended-content[data-value=" + $(this).val() + "]")
				.addClass("show");
			$(this)
				.closest(".popup")
				.attr("data-details", $(this).attr("data-details"));
		});
	}

	function initExtendableBlocks() {
		$(".extendable-info .showed-block").click(function() {
			$(this)
				.parent()
				.toggleClass("show");
		});
	}

	function initMainMenu() {
		$(".header .menu li")
			.mouseenter(function() {
				clearTimeout(menuHoverTimeout);
				$(this)
					.siblings()
					.removeClass("hover");
				$(this).addClass("hover");
			})
			.mouseleave(function() {
				var ref = this;
				menuHoverTimeout = setTimeout(function() {
					$(ref).removeClass("hover");
				}, 300);
			});
	}

	function initMobileMenu() {
		$(".mobile-menu-btn").click(function() {
			if ($("body").hasClass("show-mobile-menu"))
				$("body").removeClass("show-mobile-menu");
			else $("body").addClass("show-mobile-menu");
		});

		$(".bg-overlay, .mobile-menu .close-btn").click(function() {
			$("body").removeClass("show-mobile-menu");
			return false;
		});
	}

	function initPopups() {
		$(".popup").click(function(e) {
			if ($(e.target).is(".inner")) {
				$(this).removeClass("show");
				$("body").removeClass("no-scroll");
			}
		});

		$(".popup .window>.btn-close, .popup .bottom-bar .btn-no").click(
			function() {
				$(this)
					.closest(".popup")
					.removeClass("show");
				if ($(".popup.show").length == 0) $("body").removeClass("no-scroll");
			}
		);
	}

	function initSignupLoginPopups() {
		$(".header .signup-link, .header .login-link").click(function() {
			return false;
		});

		$(".mobile-menu .signup-link").click(function() {
			$("body").addClass("no-scroll");
			$(".popup-signup").addClass("show");
			return false;
		});

		$(".mobile-menu .login-link").click(function() {
			$("body").addClass("no-scroll");
			$(".popup-login").addClass("show");
			return false;
		});

		$(".header .submenu .signup-link").click(function() {
			$(this)
				.closest(".menu")
				.find(">li")
				.removeClass("hover");
			$(this)
				.closest(".menu")
				.find("li>.signup-link")
				.parent()
				.addClass("hover");
			return false;
		});

		$(".header .submenu .login-link").click(function() {
			$(this)
				.closest(".menu")
				.find(">li")
				.removeClass("hover");
			$(this)
				.closest(".menu")
				.find("li>.login-link")
				.parent()
				.addClass("hover");
			return false;
		});

		$(".popup-signuplogin .signup-link").click(function() {
			$(this)
				.closest(".popup")
				.removeClass("show");
			$(".popup-signup").addClass("show");
			return false;
		});

		$(".popup-signuplogin .login-link").click(function() {
			$(this)
				.closest(".popup")
				.removeClass("show");
			$(".popup-login").addClass("show");
			return false;
		});
	}

	function initCountriesPopup() {
		$(".header .countries-link").click(function() {
			return false;
		});
		$(".mobile-menu .countries-link").click(function() {
			$("body").addClass("no-scroll");
			$(".popup-countries").addClass("show");
			return false;
		});
	}

	function initSortableTimeline() {
		if ($(".timeline.edit-mode").length) {
			var sortableDays = Sortable.create($(".timeline").get(0), {
				group: "daysgroup",
				handle: ".head .icon-move",
				draggable: ".oneday",
				dragClass: "dragged",
				onEnd: changeDaysOrder
			});

			$(".timeline>.oneday>.body").each(function(index, element) {
				var sortableItems = Sortable.create(element, {
					group: "itemsgroup",
					handle: ".edit-icons .icon-move",
					draggable: ".item",
					onEnd: function() {
						showTransportBetweenItems();
					}
				});
			});
		}
	}

	function showTransportBetweenItems() {
		console.log("DEV: inserting transport recomendation here");
		var transportBlock =
			'<div class="transport"><div class="block"><i class="fas fa-car"></i> 3 km, 25 minutes <a href="#">Details</a></div></div>';
		$(".timeline .body>.transport").remove();
		$(".timeline .body>.item.filled+.item.filled").each(function(
			index,
			element
		) {
			$(element).before(transportBlock);
		});
	}

	function changeDaysOrder() {
		$(".timeline .oneday").each(function(index, element) {
			$(this)
				.find(".num")
				.text(index + 1);
		});
	}

	function changeDayDates(newDate) {
		newDate.add(-1, "d");
		$(".timeline .oneday .head .date").each(function(index, element) {
			$(this).html(": &nbsp;" + newDate.add(1, "d").format("ddd, MMM D") + "");
		});
	}

	function initDatePickers() {
		if (isMobile.any()) {
			$(".date-picker, .time-picker").each(function(index, element) {
				$(element).attr("readonly", "readonly");
			});
		}

		$(".date-picker").datetimepicker({
			format: "M/D/YYYY",
			ignoreReadonly: true,
			widgetPositioning: {
				horizontal: "left",
				vertical: "bottom"
			}
			// showClose: true
		});

		$(".timeline.edit-mode .time-picker").datetimepicker({
			format: "HH:mm",
			ignoreReadonly: true,
			widgetPositioning: {
				horizontal: "auto",
				vertical: "bottom"
			}
			// showClose: true
		});

		$(".date-field .icon, .time-field .icon").click(function(e) {
			$(this)
				.siblings(".date-picker, .time-picker")
				.data("DateTimePicker")
				.toggle();
		});

		$("#start-date").on("dp.change", function(e) {
			changeDayDates(e.date);
		});

		changeDayDates(moment($("#start-date").val(), "M/D/YYYY"));
	}

	function initScrollTopButton() {
		var offset = 300,
			offset_opacity = 1500,
			scroll_top_duration = 1500;

		$back_to_top = $(".cd-top");

		$(window).scroll(function() {
			$(this).scrollTop() > offset
				? $back_to_top.addClass("cd-is-visible")
				: $back_to_top.removeClass("cd-is-visible cd-fade-out");
			if ($(this).scrollTop() > offset_opacity) {
				$back_to_top.addClass("cd-fade-out");
			}
		});

		$back_to_top.on("click", function(event) {
			event.preventDefault();
			$("body,html").animate(
				{
					scrollTop: 0
				},
				scroll_top_duration
			);
		});
	}

	function initItineraryPage() {
		if ($(".timeline").length) {
			initDayHead();

			initMapsWidget();

			initItineraryHeaderEdit();

			initTimelineToolbar();

			initOrderMode();

			initSortableTimeline();

			initDaysEditing();

			initDayDelete();

			initItemsEditing();

			initItemDelete();

			initCustomImagesPopups();

			initShowMore();

			initExtendableInputs();

			initBookedCheckbox();

			initFileLists();

			initCustomAddTitles();

			initAddChoisePopup();

			showTransportBetweenItems();

			initAddToItineraryPopups();

			initAddDetailsPopup();

			initPopupProposalInfo();
		}
	}

	function initDayHead() {
		$(".timeline>.oneday>.head>.clickable-zone").click(function(e) {
			$(this)
				.closest(".oneday")
				.toggleClass("opened");
		});
	}

	function initShowMore() {
		$(".timeline .item .btn-more").click(function() {
			$(this)
				.closest(".item")
				.toggleClass("show-more");
		});
	}

	function initTimelineToolbar() {
		$(".timeline>.top-toolbar>.expand-link").click(function() {
			$(this)
				.closest(".timeline")
				.find(".oneday")
				.addClass("opened");
			return false;
		});

		$(".timeline>.top-toolbar>.collapse-link").click(function() {
			$(this)
				.closest(".timeline")
				.find(".oneday")
				.removeClass("opened");
			return false;
		});
	}

	function initOrderMode() {
		$(".btn-order").click(function() {
			$(this).toggleClass("on");
			$("body").toggleClass("reorder-mode");
			if ($(this).hasClass("on")) {
				$(".timeline .title textarea").attr("readonly", true);
			}
			return false;
		});
	}

	function initItemDelete() {
		$(".timeline .item .edit-icons .icon-delete").click(function() {
			var item = $(this).closest(".item");
			showPopupDialog("Are you sure you want to delete this item?", function() {
				console.log("DEV: deleting item here");
				$(item).slideUp(300);
				setTimeout(function() {
					$(item).remove();
					showTransportBetweenItems();
				}, 310);
			});
			return false;
		});
	}

	function initDayDelete() {
		$(".timeline .oneday .head .icon-delete").click(function() {
			var day = $(this).closest(".oneday");
			showPopupDialog("Are you sure you want to delete this day?", function() {
				console.log("DEV: deleting item here");
				$(day).slideUp(300);
				setTimeout(function() {
					$(day).remove();
				}, 310);
			});
			return false;
		});
	}

	function initBookedCheckbox() {
		$(".timeline .item .checkbox-booked").change(function() {
			if ($(this).prop("checked")) {
				$(this)
					.closest(".item")
					.addClass("booked");
			} else {
				$(this)
					.closest(".item")
					.removeClass("booked");
			}
		});
	}

	function initDaysEditing() {
		$(".timeline>.oneday>.head .icon-edit").click(function(e) {
			var $head = $(this).closest(".head");
			if (!$head.hasClass("edit")) {
				$head
					.addClass("edit")
					.find("input[type=text], textarea")
					.prop("readonly", false);
				setEndOfInput($head.find(".title textarea").get(0));
			} else {
				$head
					.removeClass("edit")
					.find("input[type=text], textarea")
					.prop("readonly", true);
			}
			autosize.update($head.find("textarea"));
			return false;
		});
	}

	function initItemsEditing() {
		$(
			".timeline .body>.item .content input[type=text], .timeline .body>.item .content textarea"
		).prop("readonly", true);

		$(".timeline:not(.edit-mode) .body>.item .top-bar .time-picker").prop(
			"readonly",
			true
		);

		checkTipsCheckboxes();

		$(".timeline .body>.item .edit-icons .icon-edit").click(function(e) {
			var $item = $(this).closest(".item");
			if (!$item.hasClass("edit")) {
				$item
					.addClass("edit")
					.addClass("show-more")
					.find(".content input[type=text], .content textarea")
					.prop("readonly", false);
				$item.find("[data-placeholder]").each(function(index, element) {
					$(element).prop("placeholder", $(element).attr("data-placeholder"));
				});
				//setEndOfInput($item.find('.title textarea').get(0));
			} else {
				$item
					.removeClass("edit")
					.find(".content input[type=text], .content textarea")
					.prop("readonly", true);
				$item.find("[data-placeholder]").prop("placeholder", "");

				$item.find("a.url").each(function(index, element) {
					var url = $(element)
						.parent()
						.find(".form-url")
						.val();
					$(element)
						.prop("href", url)
						.text(url);
				});
			}

			autosize.update($item.find(".content textarea"));

			checkTipsCheckboxes();
			return false;
		});
	}

	function checkTipsCheckboxes() {
		$(".timeline .body>.item .tips input[type=checkbox]").each(function(
			index,
			element
		) {
			var item = $(element).closest(".item");
			var formItem = $(element).closest(".form-item");
			if (!item.hasClass("edit")) {
				if (!$(element).prop("checked")) {
					formItem.hide();
				} else {
					formItem.show();
				}
			} else {
				formItem.show();
			}
		});
	}

	function initPopupProposalInfo() {
		$(
			".popup-item .proposals .item .image, .popup-item .proposals .item a.title"
		).click(function() {
			$(".popup-proposal-info").addClass("show");
			$("body").addClass("no-scroll");
			console.log("DEV: generate proposal info here");
			return false;
		});
	}

	function initExtendableInputs() {
		autosize($("textarea.extendable"));

		$.fn.textWidth = function(text, font) {
			if (!$.fn.textWidth.fakeEl)
				$.fn.textWidth.fakeEl = $("<span>")
					.hide()
					.appendTo(document.body);
			$.fn.textWidth.fakeEl
				.text(text || this.val() || this.text() || this.attr("placeholder"))
				.css("font", font || this.css("font"));
			return $.fn.textWidth.fakeEl.width();
		};

		$("input.extendable")
			.on("input", function() {
				var inputWidth = $(this).textWidth() + 9;
				$(this).css({
					width: inputWidth
				});
			})
			.trigger("input");

		function inputWidth(elem, minW, maxW) {
			elem = $(this);
		}

		inputWidth($("input.extendable"));
	}

	function initAddToItineraryPopups() {
		$(".timeline:not(.edit-mode)")
			.find(
				".btn-add-lodging, .btn-add-transport, .btn-add-restaurant, .btn-add-activity"
			)
			.click(function() {
				showPopupDialog(
					"Would you like to Save to My Itineraries & Edit?",
					function() {
						console.log("DEV: Save to My Itinerary");
					}
				);
				return false;
			});

		$(".timeline.edit-mode")
			.find(".btn-add-lodging, .add-item-lodging")
			.click(function() {
				$(".popup-lodging").addClass("show");

				$(".popup-lodging .choice-block input[type=radio]")
						.first()
						.prop("checked", true)
						.change();

				$("body").addClass("no-scroll");
				return false;
			});

		$(".timeline.edit-mode")
			.find(".btn-add-transport, .add-item-transport")
			.click(function() {
				$(".popup-transport").addClass("show");
				if ($(this).attr("data-radio"))
					$(".popup-transport .choice-block")
						.find("[value=" + $(this).attr("data-radio") + "]")
						.prop("checked", true)
						.change();
				else
					$(".popup-transport .choice-block")
						.find("[value=flight]")
						.prop("checked", true)
						.change();
				$("body").addClass("no-scroll");
				return false;
			});

		$(".timeline.edit-mode")
			.find(".btn-add-restaurant, .add-item-restaurant")
			.click(function() {
				$(".popup-restaurant").addClass("show");
				$("body").addClass("no-scroll");
				return false;
			});

		$(".timeline.edit-mode")
			.find(".btn-add-activity, .add-item-activity")
			.click(function() {
				$(".popup-activity").addClass("show");
				$("body").addClass("no-scroll");
				return false;
			});

		$(".timeline.edit-mode")
			.find(".proposals .btn-add")
			.click(function() {
				var mainPopup = $(this).closest(".popup");
				showPopupDialog(
					"Are you sure you want to add it to itinerary?",
					function() {
						console.log("DEV: adding object to itinerary here");
						mainPopup.removeClass("show");
					}
				);
				return false;
			});
	}

	function showPopupDialog(textDialog, functionYes, popupClass) {
		var code =
			'<div class="popup popup-dialog"><div class="back"></div><div class="content-area"><div class="inner"><div class="window"><div class="btn-close"></div><div class="popup-question">';
		code += textDialog;
		code +=
			'</div><div class="bottom-bar"><button class="btn btn-yes">Yes</button><button class="btn btn-no">No</button></div></div></div></div></div>';
		var popup = $(code);
		$("body").append(popup);

		$("body").addClass("no-scroll");
		$(popup).addClass("show");

		$(popup)
			.find(".window>.btn-close, .btn-no")
			.click(function() {
				$(this)
					.closest(".popup")
					.removeClass("show");
				if ($(".popup.show").length == 0) $("body").removeClass("no-scroll");
				setTimeout(function() {
					$(popup).remove();
				}, 400);
			});

		$(popup)
			.find(".btn-yes")
			.click(function() {
				$(this)
					.closest(".popup")
					.find(".window>.btn-close")
					.click();
				if (functionYes) functionYes();
			});
	}

	function initFileLists() {
		$(".files .file .closer").click(function() {
			var ref = this;
			showPopupDialog("Are you sure you want to delete this file?", function() {
				$(ref)
					.parent()
					.delay(100)
					.hide(200);
			});
			return false;
		});

		$(".popup-file-delete .btn-yes").click(function() {
			console.log("DEV: delete file here");
			$(this)
				.closest(".popup")
				.find(".window>.btn-close")
				.click();
			$(this)
				.closest(".popup")
				.data("file")
				.delay(100)
				.hide(200);
		});
	}

	function initMapsWidget() {
		$(".map-widget .show-more").click(function() {
			$(this)
				.closest(".days")
				.toggleClass("show");
		});
	}

	function initVTabs() {
		if ($(".vtabs").length) {
			$(".vtabs .tabs-nav a").click(function() {
				var tabPane = $(this).attr("href");
				$(this)
					.closest(".tabs-nav")
					.find("li.active")
					.removeClass("active");

				$(this)
					.closest(".vtabs")
					.find(".tabs-content .tab-pane.active")
					.removeClass("active");
				$(tabPane).addClass("active");
				$(this)
					.parent()
					.addClass("active");

				return false;
			});
		}
	}

	function initItineraries() {
		$(".itineraries .item .btn-map, .itineraries .item .btn-image").click(
			function() {
				var $item = $(this).closest(".item");
				if ($item.hasClass("showmap")) $item.removeClass("showmap");
				else $item.addClass("showmap");
			}
		);
	}

	function initCustomImagesPopups() {
		$(".timeline .oneday .image").each(function() {
			//console.log($(this).parent());
			mPopup = $(this).magnificPopup({
				// delegate: 'a[href$=".gif"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".bmp"]',
				type: "image",
				tLoading: "Loading #%curr%...",
				mainClass: "mfp-fade",
				gallery: {
					enabled: false,
					navigateByImgClick: true,
					preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
				}
			});
		});
	}

	function initPhotoGalleries() {
		$(".gallery .owl-carousel").owlCarousel({
			items: 6,
			nav: true,
			dots: false,
			loop: false,
			margin: 5,
			autoHeight: false,
			lazyLoad: true,
			responsive: {
				0: {
					items: 3
				},
				350: {
					items: 3
				},
				450: {
					items: 4
				},
				700: {
					items: 5
				},
				800: {
					items: 6
				},
				950: {
					items: 6
				},
				1200: {
					items: 6
				}
			},
			navText: [
				'<i class="fas fa-chevron-left"></i>',
				'<i class="fas fa-chevron-right"></i>'
			]
		});

		$(".gallery .owl-carousel").each(function() {
			$(this).magnificPopup({
				delegate: "a",
				type: "image",
				tLoading: "Загрузка #%curr%...",
				mainClass: "mfp-fade",
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
				},

				zoom: {
					enabled: true,
					duration: 300,
					opener: function(element) {
						//console.log(element);
						return element.find("img");
					}
				},

				image: {
					tError:
						'Не получается загрузить <a href="%url%">изображение #%curr%</a>.'
				}
			});
		});
	}

	/*
Attr example: data-animate="fadeIn, slideInUp" data-animate-back="fadeOut, slideInDonw" data-init="hidden" data-offset="0.80" data-duration="1s"  data-delay="1s" 
*/
	function initScrollAnimation() {
		$("[data-animate]").each(function(index, element) {
			$(element).addClass("animated");
			if ($(element).attr("data-init") == "hidden")
				$(element).css({
					opacity: 0
				});

			var waypoints = $(element).waypoint(
				function(direction) {
					var ref = $(this.element);
					var del = $(element).attr("data-delay")
						? $(element).attr("data-delay")
						: 0;
					var duration = $(element).attr("data-duration")
						? $(element).attr("data-duration")
						: 0;

					if (duration != 0) $(element).css("animation-duration", duration);
					$(element).css("animation-delay", del);

					if (direction == "down") {
						if ($(ref).attr("data-init") == "hidden")
							$(ref).css({
								opacity: 1
							});
						$(ref).css("animation-name", $(ref).attr("data-animate"));
					}
				},
				{
					offset: $(element).attr("data-offset")
				}
			);
		});
	}

	function setEndOfInput(elem) {
		var elemLen = elem.value.length;

		// For IE Only
		if (document.selection) {
			// Set focus
			elem.focus();
			// Use IE Ranges
			var oSel = document.selection.createRange();
			// Reset position to 0 & then set at end
			oSel.moveStart("character", -elemLen);
			oSel.moveStart("character", elemLen);
			oSel.moveEnd("character", 0);
			oSel.select();
		} else if (elem.selectionStart || elem.selectionStart == "0") {
			// Firefox/Chrome
			elem.selectionStart = elemLen;
			elem.selectionEnd = elemLen;
			elem.focus();
		} // if
	}

	function setEndOfContenteditable(contentEditableElement) {
		var range, selection;
		if (document.createRange) {
			//Firefox, Chrome, Opera, Safari, IE 9+
			range = document.createRange();
			range.selectNodeContents(contentEditableElement);
			range.collapse(false);
			selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		} else if (document.selection) {
			//IE 8 and lower
			range = document.body.createTextRange();
			range.moveToElementText(contentEditableElement);
			range.collapse(false);
			range.select();
		}
	}

	function onScroll() {
		if ($(document).scrollTop() > 0) $("body").addClass("scrolled");
		else $("body").removeClass("scrolled");

		if ($(".main-section").length) {
			var $hand = $(".main-section .hand");
			if ($hand.css("display") != "none") {
				var winBottom = $(document).scrollTop() + $(window).height();
				var bottomWhatSection =
					$(".what-section").position().top + $(".what-section").outerHeight();

				if (winBottom >= bottomWhatSection) {
					$hand.css({
						bottom: -$(".what-section").outerHeight()
					});
				} else {
					$hand.css({
						bottom: -(winBottom - $(".main-section").height())
					});
				}
			} else {
				$hand.attr("style", "");
			}
		}

		if ($(".plans .map-widget").length) {
			if (
				$(".plans").offset().top <
					$(document).scrollTop() + $("header.header").outerHeight() + 10 &&
				$(window).width() > 800
			) {
				$(".plans .map-widget").css(
					"top",
					$(document).scrollTop() +
						$("header.header").outerHeight() +
						10 -
						$(".plans").offset().top +
						"px"
				);

				if (
					$(".plans .map-widget").offset().top +
						$(".plans .map-widget").outerHeight() >
					$(".plans").offset().top + $(".plans").outerHeight()
				) {
					$(".plans .map-widget").css(
						"top",
						$(".plans").height() - $(".plans .map-widget").outerHeight()
					);
				}
			} else {
				$(".plans .map-widget").css("top", 0);
			}
		}

		if ($(".sticky-bar").length) {
			var winBottom = $(document).scrollTop() + $(window).height();

			$(".stiky-bar-container").css("height", $(".sticky-bar").outerHeight());
			if (
				$(".footer").offset().top > winBottom &&
				$(".timeline").offset().top + 150 < winBottom
			) {
				$(".sticky-bar").addClass("fixed-sticky");
			} else {
				$(".sticky-bar").removeClass("fixed-sticky");
			}
		}
	}

	function onResize() {
		var className = "landscape";

		if ($(window).width() / $(window).height() <= 1) className = "portret";

		$("body")
			.removeClass("landscape")
			.removeClass("portret")
			.addClass(className);

		if (isMobile.any()) {
			$("body").addClass("mobile");
		} else {
			$("body").removeClass("mobile");
		}

		$(window).scroll();
	}
})(jQuery);
