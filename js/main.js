var Pairs = (function() {
	var wrap = document.querySelector('.wrap');
	var pairsTime = document.querySelector('#pairsTime');
	var currentDay = new Date().getDay() - 1;


	// HACK
	if (currentDay === -1) currentDay = 6;


 	var touchstart = {
		x: 0,
		y: 0
	};
	var touchmove = {
		x: 0,
		y: 0
	};
	var isDayChange = false;

	var times = [
		["8:00", "9:30"],
		["9:40", "11:10"],
		["11:30", "13:00"],
		["13:10", "14:40"],
		["14:50", "16:20"],
		["16:30", "18:00"],
		["18:10", "19:40"],
		["19:50", "21:20"]
	];

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
		},
		setPair: function(pairID) {
			var times = pairsTime.children;
			for (var item in times) {
				times[item].className = 'pair-time';
			}
			times[pairID].className = 'pair-time pair-time-current';
		},
		setCurrentPair: function() {
			console.log(cTimeSum);
			for (var time in times) {
				var f = times[time][0].split(':');
				var s = times[time][1].split(':');
				var fSum = f[0] * 60 + parseInt(f[1]);
				var sSum = s[0] * 60 + parseInt(s[1]);
				var cTimeSum = new Date().getHours() * 60 + new Date().getMinutes();
				if (cTimeSum >= fSum && cTimeSum <= sSum) {
					Pairs.setPair(time);
				}
			}
		}
	};
})();
Pairs.init();
setInterval(Pairs.setCurrentPair, 1000);