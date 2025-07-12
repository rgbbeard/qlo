[
	String.prototype, 
	Number.prototype, 
	Boolean.prototype
].forEach(proto => {
	Object.defineProperty(proto, "toBool", {
		value: function() {
			return String(this)
				.replace(/\s+/gm, "")
				.match(/^true|yes|y|1$/i);
		},
		writable: false,
		configurable: false
	});
});

// Object
Object.entries({
  	keys: function() {
		return Object.keys(this);
	},
  	isEmpty: function() {
		return Object.keys(this).length === 0;
	}
}).forEach(([name, fn]) => {
	if(!Object.prototype[name]) {
		Object.defineProperty(Object.prototype, name, {
			value: fn,
			writable: false,
			configurable: false
		});
	}
});

// Array
Object.entries({
  	prepend: function(o) {
    	let temp = this.slice();
    	temp.unshift(o);
    	return temp;
  	},
	getLast: function() {
		return this[this.length - 1];
	}
}).forEach(([name, fn]) => {
	if(!Array.prototype[name]) {
		Object.defineProperty(Array.prototype, name, {
			value: fn,
			writable: false,
			configurable: false
		});
	}
});

// String
Object.entries({
  	capitalize: function() {
		let 
			str = this.substr(1).toLowerCase(), 
			cap = this[0].toUpperCase();
		return cap + str;
	},
	rmwhitesp: function() {
		return this.replace(/\s/g, "");
	},
	toInt: function() {
		return parseInt(this) || 0;
	},
	toDouble: function() {
		return parseFloat(this) || 0;
	}
}).forEach(([name, fn]) => {
	if(!String.prototype[name]) {
		Object.defineProperty(String.prototype, name, {
			value: fn,
			writable: false,
			configurable: false
		});
	}
});

// Number
Object.entries({
  	percentage: function(p) {
		return p / 100 * this;
	},
	inRange: function(min, max) {
		return this >= parseFloat(min) && this <= parseFloat(max);
	}
}).forEach(([name, fn]) => {
	if(!Number.prototype[name]) {
		Object.defineProperty(Number.prototype, name, {
			value: fn,
			writable: false,
			configurable: false
		});
	}
});