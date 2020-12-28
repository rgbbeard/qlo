/*
	JavaScript library
		Latest@17-12-2020
*/
const javascript = Object || String || Number || Array || Boolean;
const element = Element || Switchbox || Slider || Interface || Confirm || Toast || TextSwitchbox || Playground || Rectangle;
const axl = Object || element;

axl.prototype.stretch = function(properties = "width, height", mode = "match_parent, match_parent") {
	this.parentHeight = this.parentNode.offsetHeight;
	this.parentWidth = this.parentNode.offsetWidth;

	if(properties === "width" && mode !== "match_parent") {
		if(mode[mode.length-1] == "%") {
			let width = this.parentNode.offsetWidth;
			width = width.percentage(parseInt(mode));
			this.style.width = width+"px";
		}
		else if(mode[mode.length-1] == "px") {
			let width = this.parentNode.style.width - parseInt(mode);
			this.style.width = width+"px";
		}
	}
	else if(properties == "width" && mode == "match_parent") {
		this.style.width = this.parentWidth+"px";
	}
	
	else if(properties.match(/height/i) && mode.split(",")[1].match(/match_parent/i)) {
		this.style.height = this.parentHeight+"px";
	}
	
	else if(properties.match(/all/i) && mode.match(/match_parent/i)) {
		this.style.width = this.parentNode.offsetWidth+"px";
		this.style.height = this.parentNode.offsetHeight+"px";
	}
};
axl.prototype.focused = function (fn) {
	let f = this.focus();
	if (f === true) fn.call();
};
axl.prototype.instance = function() {
	return 
};
Array.prototype.inArray = function (obj) {
	for (let x = 0; x < this.length; x++) {
		if (this[x] === obj) return true;
	}
	return false;
};
Object.prototype.hasClass = function (c) {
	return this.classList.contains(c);
};
Object.prototype.toggleClass = function (c) {
	this.classList.toggle(c);
};
Object.prototype.toggleClasses = function (...args) {
	args.forEach(c => this.classList.toggle(c));
};
Object.prototype.removeClass = function (c) {
	this.classList.remove(c);
};
Object.prototype.removeClasses = function (...args) {
	args.forEach(c => this.removeClass(c));
};
Object.prototype.addClass = function (c) {
	this.classList.add(c);
};
Object.prototype.addClasses = function (...args) {
	args.forEach(c => this.addClass(c));
};
Object.prototype.removeAttributes = function (...args) {
	args.forEach(a => this.removeAttribute(a));
};
Object.prototype.appendChildren = function (...args) {
	args.forEach(child => this.appendChild(child));
};
Object.prototype.removeChildren = function (...args) {
	args.forEach(child => this.removeChild(child));
};
Object.prototype.insertAfter = function (newElement) {
	this.parentNode.insertBefore(newElement, this.nextElementSibling);
};
Object.prototype.moveBefore = function() {
    let
        parent = this.parentNode,
        siblings = parent.children;
    if(siblings.length > 1) {
        let i = siblings.elementIndex(this);
        parent.insertBefore(siblings[i-1], siblings[i]);
        return true;
    }
    return false;
};
Object.prototype.removeId = function (id) {
	if (this.attr("id") !== null) {
		let ids = this.attr("id").split(" ");
		let i = ids.indexOf(id.toString());
		ids = ids.splice(i, i);
		ids.length > 0 ?
	    	this.setAttribute("id", ids.join(" ")):
	        this.removeAttribute("id");
	}
};
Object.prototype.addId = function (id) {
	if (this.attr("id") == null) {
		this.setAttribute("id", id);
	} else {
		let ids = this.attr("id").split(" ");
		let hasId = false;
		for (let x = 0; x < ids.length; x++) {
			if (ids[x] === id) {
				hasId = true;
				break;
			} else continue;
		}
		if (hasId === false) this.setAttribute("id", ids.join(" "));
	}
};
String.prototype.capitalize = function () {
	let str = this.substr(1).toLowerCase();
	let cap = this[0].toUpperCase();
	return cap + str;
};
javascript.prototype.isFunction = function () {
	return this && {}.toString.call(this) === '[object Function]';
};
javascript.prototype.bool = function () {
	let str = String(this).replace(/[\s|\t|\n]+/gm, "");
	if (str.match(/true/i) || str.match(/yes/i) || str.match(/y/i) || str === "1") return true;
	return false;
};
javascript.prototype.empty = function () {
	let target = String(this);
	if (target.match(/[\s|\t|\n]+/gm) || target === "" || target === "null" || target === "undefined" || (this.isArray() === true && this.length < 1)) return true;
	return false;
};
Array.prototype.globalAction = function (listener, fn) {
	this.forEach(a => {
		_(a).addEventListener(listener, fn);
	});
};
Number.prototype.percentage = function (percentage) {
	return percentage / 100 * this;
};
Object.prototype.elementIndex = function (element) {
	for (let i = 0; i < this.length; i++) {
		if (this[i] === element) {
			return i;
		}
	}
	return -1;
};
Object.prototype.addStyles = function (s = {}) {
	let p = [];
	for(let k in s) {
		if(s[k].isFunction()) continue;
		p.push(String(k+":"+s[k]));
	}
	this.setAttribute("style", p.join(";"));
};
Number.prototype.inRange = function (min, max) {
	if (this >= parseInt(min) && this <= parseInt(max)) return true;
	return false;
};