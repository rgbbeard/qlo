const Javascript = Object || String || Number || Array || Boolean;
Array.prototype.inArray = function (obj) {
	for (let x = 0; x < this.length; x++) {
		if (this[x] === obj) return true;
	}
	return false;
};
Array.prototype.globalAction = function (listener, fn) { this.forEach(a => _(a).addEventListener(listener, fn)); };
Object.prototype.hasClass = function (c) { return this.classList.contains(c); };
Object.prototype.toggleClass = function (c) { this.classList.toggle(c); };
Object.prototype.toggleClasses = function (...args) { args.forEach(c => this.classList.toggle(c)); };
Object.prototype.removeClass = function (c) { this.classList.remove(c); };
Object.prototype.removeClasses = function (...args) { args.forEach(c => this.removeClass(c)); };
Object.prototype.addClass = function (c) { this.classList.add(c); };
Object.prototype.addClasses = function (...args) { args.forEach(c => this.addClass(c)); };
Object.prototype.removeAttributes = function (...args) { args.forEach(a => this.removeAttribute(a)); };
Object.prototype.appendChildren = function (...args) { args.forEach(child => this.appendChild(child)); };
Object.prototype.removeChildren = function (...args) { args.forEach(child => this.removeChild(child)); };
Object.prototype.insertAfter = function (newElement) { this.parentNode.insertBefore(newElement, this.nextElementSibling); };
Object.prototype.moveBefore = function() {
    let parent = this.parentNode, prev = this.previousElementSibling;
	if(!isNull(prev)) {
		parent.insertBefore(this, prev);
	}
};
Object.prototype.moveAfter = function() {
	let parent = this.parentNode, next = this.nextElementSibling, nextIsLast = isNull(next.nextElementSibling) ? true : false;
	if(!isNull(next)) {
		let index = parent.children.elementIndex(next);
		if(!nextIsLast) {
			parent.insertBefore(this, parent.children[index+1]);
		} else {
			parent.appendChild(this);
		}
	}
};
Object.prototype.removeId = function (id) {
	if (this.getAttribute("id") !== null) {
		let ids = this.getAttribute("id").split(" ");
		let i = ids.indexOf(id.toString());
		ids = ids.splice(i, i);
		ids.length > 0 ?
	    	this.setAttribute("id", ids.join(" ")):
	        this.removeAttribute("id");
	}
};
Object.prototype.addId = function (id) {
	if (this.getAttribute("id") == null) {
		this.setAttribute("id", id);
	} else {
		let ids = this.getAttribute("id").split(" "), hasId = false;
		for (let x = 0; x < ids.length; x++) {
			if (ids[x] === id) {
				hasId = true;
				break;
			}
		}
		if (hasId === false) this.setAttribute("id", ids.join(" "));
	}
};
Object.prototype.hasId = function(id) {
	let ids = this.getAttribute("id");
	 if(!isNull(ids)) {
		ids = ids.split(" ");
		ids.forEach(i => {
			if(i == id.toString()) return true;
		});
	 }
	 return false;
};
Object.prototype.elementIndex = function (element) {
	for (let i = 0; i < this.length; i++) {
		if (this[i] === element) return i;
	}
	return -1;
};
Object.prototype.addStyles = function (styles = {}) {
	let temp = [];
	for(let style in styles) {
		if(styles[style].isFunction()) continue;
		temp.push(String(style+":"+styles[style]));
	}
	this.setAttribute("style", temp.join(";"));
};
Object.prototype.length = function() { return Object.keys(this).length; };
Object.prototype.isDisabled = function() { return isNull(this.getAttribute("disabled")) ? false : true; };
String.prototype.capitalize = function () {
	let str = this.substr(1).toLowerCase(), cap = this[0].toUpperCase();
	return cap + str;
};
String.prototype.rmwhitesp = function () { return this.replace(/\s/g, ""); };
String.prototype.int = function() {
	return parseInt(this);
};
Number.prototype.percentage = function (percentage) { return percentage / 100 * this; };
Number.prototype.inRange = function (min, max) { return this >= parseInt(min) && this <= parseInt(max) ? true : false; };
Javascript.prototype.isArray = function() { return Array.isArray(this); };
Javascript.prototype.isFunction = function () { return this && {}.toString.call(this) === '[object Function]'; };
Javascript.prototype.bool = function () {
	let str = String(this).replace(/[\s|\t|\n]+/gm, "");
	return str.match(/true/i) || str.match(/yes/i) || str.match(/y/i) || str === "1" ? true : false;
};
Javascript.prototype.empty = function () {
	let target = String(this);
	return target.match(/[\s|\t|\n]+/gm) || target === "" || target === "null" || target === "undefined" || (this.isArray() === true && this.length < 1) ? true : false;
};
