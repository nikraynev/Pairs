var Pairs = (function() {
	var wrap = document.querySelector('.wrap');
	var currentDay = new Date().getDay() - 1;
	var touchstart = {
		x: 0,
		y: 0
	};
	var touchmove = {
		x: 0,
		y: 0
	};
	var isDayChange = false;
	return {
		init: function() {
			console.log('Init');
			this.setDay(currentDay);
			wrap.addEventListener('touchstart', this.touchStart);
			wrap.addEventListener('touchmove', this.touchMove);
			wrap.addEventListener('touchend', this.touchEnd);
		},
		setDay: function(dayID) {
			wrap.style.webkitTransform = 'translate(calc((-100% / 7) * ' + dayID + '))';
			wrap.style.msTransform = 'translate(calc((-100% / 7) * ' + dayID + '))';
			wrap.style.oTransform = 'translate(calc((-100% / 7) * ' + dayID + '))';
			wrap.style.transform = 'translate(calc((-100% / 7) * ' + dayID + '))';
		},
		left: function() {
			if (currentDay == 0) currentDay = 6;
			else currentDay--;
			this.setDay(currentDay);
		},
		right: function() {
			if (currentDay == 6) currentDay = 0;
			else currentDay++;
			this.setDay(currentDay);
		},
		touchStart: function(e) {
			touchstart.x = e.touches[0].clientX;
			touchstart.y = e.touches[0].clientY;
		},
		touchMove: function(e) {
			e.preventDefault();
			if (isDayChange) return;
			var x = e.touches[0].clientX;
			var y = e.touches[0].clientY;
			if (touchstart.x - x > 100) {
				Pairs.right();
				isDayChange = true;
			}
			else if (touchstart.x - x < -100) {
				Pairs.left();
				isDayChange = true;
			}
		},
		touchEnd: function(e) {
			isDayChange = false;
		}
	};
})();
Pairs.init();