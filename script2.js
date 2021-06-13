$(function () {
	const bannerList = $('ul > li');
	const listWidth = Math.floor(bannerList.outerWidth());
	const listCount = bannerList.length;
	const maxX = (listCount - 1) * listWidth;
	const minX = -1 * listWidth;
	// list 배치
	$.each(bannerList, function (index, item) {
		$(this).css({
			left: index * listWidth,
		})
	})

	// click event
	const prevBtn = $('.prev');
	const nextBtn = $('.next');
	const pauseBtn = $('.pause');
	const bannerSpeed = 1000;
	const clickSpeed = 300;
	let bannerDirection = 'prev'
	let nowSpeed = bannerSpeed;
	let noClick = false;
	let isAuto = true;
	let isMotion = true;

	prevBtn.on('click', function () {
		if (noClick == false) {
			nowSpeed = clickSpeed;
			bannerDirection = 'prev';
			movePrev();
		}
	});
	nextBtn.on('click', function () {
		if (noClick == false) {
			nowSpeed = clickSpeed;
			bannerDirection = 'next';
			moveNext();
		}
	});
	pauseBtn.on('click', function () {
		if (isAuto == true) {
			pauseBtn.text('►')
			pauseBtn.css('color', 'red');
			isAuto = false;
		} else {
			pauseBtn.text('||')
			pauseBtn.css('color', 'black');
			isAuto = true;
			clearInterval(bannerTimer);
			bannerTimer = setInterval(makeBannerTimer, bannerDelay);
		}
	});

	bannerList.mouseenter(function () {
		isMotion = false;
	});
	bannerList.mouseleave(function () {
		isMotion = true;
	});

	prevBtn.mouseenter(function () {
		isMotion = false;
	});
	prevBtn.mouseleave(function () {
		isMotion = true;
	});

	nextBtn.mouseenter(function () {
		isMotion = false;
	});
	nextBtn.mouseleave(function () {
		isMotion = true;
	});

	function movePrev() {
		noClick = true;
		$.each(bannerList, function (index, item) {
			let tempX = $(this).css('left');
			tempX = parseInt(tempX);
			if (tempX <= minX) {
				$(this).css('left', maxX);
				tempX = maxX;
			}
			tempX -= listWidth;
			$(this).animate({
				left: tempX,
			}, nowSpeed, function () {
				noClick = false;

				if (!isMotion) {
					return;
				}
				clearInterval(bannerTimer);
				bannerTimer = setInterval(makeBannerTimer, bannerDelay);
			});
		});
	}

	function moveNext() {
		noClick = true;
		$.each(bannerList, function (index, item) {
			let tempX = $(this).css('left');
			tempX = parseInt(tempX);
			if (tempX >= maxX) {
				$(this).css('left', minX);
				tempX = minX;
			}
			tempX += listWidth;
			$(this).animate({
				left: tempX,
			}, nowSpeed, function () {
				noClick = false;

				if (!isMotion) {
					return;
				}
				clearInterval(bannerTimer);
				bannerTimer = setInterval(makeBannerTimer, bannerDelay);
			});
		});
	}

	// auto motion
	let bannerTimer;
	const bannerDelay = 2000;

	clearInterval(bannerTimer);
	bannerTimer = setInterval(makeBannerTimer, bannerDelay);

	function makeBannerTimer() {
		if (!isMotion || !isAuto) {
			return;
		}
		nowSpeed = bannerSpeed;
		if (bannerDirection == 'prev') {
			movePrev();
		} else {
			moveNext();
		}
	}

	// 다른 페이지 이동 시, interval 정지
	$(window).blur(function() {
		clearInterval(bannerTimer);
	});
	// 현재 페이지로 돌아왔을 시, interval 실행
	$(window).focus(function() {
		clearInterval(bannerTimer);
		bannerTimer = setInterval(makeBannerTimer, bannerDelay);
	});
});