SystemFn(function() {
	let dls = _(".difficulty-level-selector");

	Object.prototype.selectedDots = function() {
		let sd = 0, dots = this.querySelectorAll(".dot");

		dots.forEach(d => {
			if(d.hasClass("selected")) {
				sd++;
			}
		});

		return sd;
	};

	Object.prototype.deselectDots = function() {
		let dots = this.querySelectorAll(".dot");
		dots.forEach(d => d.removeClass("selected"));
	};

	Object.prototype.selectDots = function(until) {
		let dots = this.querySelectorAll(".dot");

		for(let x = 0;x <= until;x++) {
			dots[x].addClass("selected");	
		}
	};

	function selectLevel(s, d, input) {
		if(d.isFirstChild()) {
			s.deselectDots();

			if(!d.hasClass("selected")) {
				d.addClass("selected");
			}
		} else if(!d.isFirstChild() && !d.isLastChild()) {
			let index = s.elementIndex(d);
			s.deselectDots();
			s.selectDots(index);
		}

		input.value = s.selectedDots();
	}

	dls.forEach(s => {
		if(s.hasAttribute("max")) {
			let max = Number(s.getAttribute("max"));

			for(let x = 0;max>x;max--) {
				s.prepend(new Element({
					type: "div",
					class: ["dot"],
					text: max
				}));
			}
		}

		let dots = s.querySelectorAll(".dot"), dotslen = dots.length, input = s.querySelector('input'), zero = null;

		if(s.hasAttribute("add-zero")) {
			zero = new Element({
				type: "div",
				class: ["zero"],
				text: "0"
			});

			s.prepend(zero);
			dots.prepend(zero);
			dotslen += 1;

			input.value = 0;
		} else {
			input.value = 1;
		}

		dots[0].addClass("selected");

		dots.forEach(d => {
			d.onmouseover = function() {selectLevel(s, d, input);};
			d.onclick = function() {selectLevel(s, d, input);};
		});
	});
});