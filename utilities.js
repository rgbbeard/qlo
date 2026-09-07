import Select from "./select.js";

let
	www = String(window.location.origin + "/"),
	ww = window.innerWidth,
	wh = window.innerHeight,
	dw = document.documentElement.clientWidth,
	dh = document.documentElement.clientHeight,
	bw = document.body.clientWidth,
	bh = document.body.clientHeight
;
window.addEventListener("resize", function() {
	wh = window.innerHeight;
	dw = document.documentElement.clientWidth;
	dh = document.documentElement.clientHeight;
	bw = document.body.clientWidth;
	bh = document.body.clientHeight;
});

window.SystemExecution = [];

const 
	$ = selector => new Select(selector),
	isNull = function(target) {
		return target === null;
	},
	isUndefined = function(target) {
		return target === undefined;
	},
	isDeclared = function(target) {
		return !isNull(target) && !isUndefined(target);
	},
	isFunction = function(target) {
		return Boolean(
			target 
			&& {}.toString.call(target) === '[object Function]'
		);
	},
	isDict = function(target) {
		return Boolean(
			target 
			&& Object.prototype.toString.call(target) === '[object Object]'
		);
	},
	isArray = function(target) {
		return Array.isArray(target);
	},
	SystemFn = function(fn) {
		if(isDeclared(fn) && isFunction(fn)) {
			window.SystemExecution.push(fn);
		} else {
			console.error("SystemFn expects 1 parameter and it must be a function.");
		}
	},
	SystemExec = function() {
		let functions = window.SystemExecution, temp = [];

		functions.forEach(fn => {
			if(isFunction(fn)) {
				temp.push(fn);
			}
		});

		if(temp.length > 0) {
			temp.forEach(fn => fn.call());
			console.log("Execution finished.");
		} else {
			console.log("No functions were found.");
		}
	};

window.addEventListener("load", SystemExec);

export {
    SystemFn as default, 
    SystemFn,
    $, 
    www,
    isNull,
    isUndefined,
    isDeclared,
    isFunction,
    isDict,
    isArray
};