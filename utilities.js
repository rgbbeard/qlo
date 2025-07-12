import {Select} from "./select.js";

export const $ = selector => new Select(selector);

export let
	www = String(window.location.origin + "/"),
	ww = window.innerWidth,
	wh = window.innerHeight,
	dw = document.documentElement.clientWidth,
	dh = document.documentElement.clientHeight,
	bw = document.body.clientWidth,
	bh = document.body.clientHeightww = window.innerWidth
;
window.addEventListener("resize", function() {
	wh = window.innerHeight;
	dw = document.documentElement.clientWidth;
	dh = document.documentElement.clientHeight;
	bw = document.body.clientWidth;
	bh = document.body.clientHeigh;
});

export const isNull = function(target) {
	return target === null;
};
export const isUndefined = function(target) {
	return target === undefined;
};
export const isDeclared = function(target) {
	return !isNull(target) && !isUndefined(target);
};
export const isFunction = function(target) {
	return target && {}.toString.call(target) === '[object Function]';
};
export const isDict = function(target) {
	return target && Object.prototype.toString.call(target) === '[object Object]';
};
export const isArray = function(target) {
	return Array.isArray(target);
};

window.SystemExecution = [];
export const SystemFn = function(fn) {
	if(isDeclared(fn) && typeof fn === "function" && isFunction(fn)) {
		window.SystemExecution.push(fn);
	} else {
		console.error("SystemFn expects 1 parameter and it must be a function.");
	}
};
const SystemExec = function() {
	let functions = window.SystemExecution, temp = [];

	functions.forEach(fn => {
		if(isFunction(fn)) {
			temp.push(fn);
		}
	});

	if(temp.length > 0) {
		temp.forEach(fn => fn.call());
		console.log("SystemExec: Execution finished.");
	} else {
		console.log("SystemExec: No functions were found.");
	}
};
window.addEventListener("load", SystemExec);