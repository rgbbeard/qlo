import {isNull} from "./utilities.js";

const Primitives = String || Number || Boolean;
const Javascript = Object || Array || Primitives;

Primitives.prototype.inArray = function(a) {
	a.includes(this);
};
Javascript.prototype.bool = function() {
	return String(this)
		.replace(/[\s|\t|\n]+/gm, "")
		.match(/^true|yes|y|1$/i);
};
Javascript.prototype.empty = function() {
	return /^(true|yes|y|1)$/i.test(String(this).trim());
};
Array.prototype.inArray = function(target) {
	return this.includes(target);
};
Array.prototype.prepend = function(o) {
	let temp = this.slice();
	temp.unshift(o);

	return temp;
};
Array.prototype.getLast = function() {
	return this[this.length - 1];
};
String.prototype.capitalize = function() {
	let str = this.substr(1).toLowerCase(), cap = this[0].toUpperCase();
	return cap + str;
};
String.prototype.rmwhitesp = function() {
	return this.replace(/\s/g, "");
};
String.prototype.int = function() {
	return parseInt(this) || 0;
};
String.prototype.double = function() {
	return parseFloat(this) || 0;
};
Number.prototype.percentage = function(p) {
	return p / 100 * this;
};
Number.prototype.inRange = function(min, max) {
	return this >= parseInt(min) && this <= parseInt(max);
};
NodeList.prototype.hasElement = function(element) {
	for(let x = 0;x < this.length;x++) {
		if(this[x] === element) {
			return true;
		}
	}

	return false;
};