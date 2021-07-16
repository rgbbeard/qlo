const dom = document, win = window, www = String(win.location.origin + "/"), ww = win.innerWidth, wh = win.innerHeight;
//Select html elements
class Selection {
	constructor(selector = "body") {
		this.lastElement = selector;
		this.result = null;
		if(selector.match(/\s+/)) {
			this.elements = selector.split(" ");
			this.lastElement = this.elements[this.elements.length -1];
		}
		this.selectBy = this.lastElement[0];
		if(this.selectBy === "#") {
			this.result = document.querySelector(selector);
		} else if(this.selectBy === ".") {
			this.result = document.querySelectorAll(selector);
		} else if(this.selectBy.match(/[\d|\D]/)) {
			this.result = document.querySelectorAll(selector);
		} else if(this.selectBy === "[") {
			this.result = document.querySelectorAll(selector);
		} else if(this.selectBy === "*") {
			this.result = document.querySelectorAll(selector);
		}
		return this.result;
	}
}
//Alias of new Selection(selector)
const _= selector => new Selection(selector);
class Converter {
	rgb2Hex(r, g, b) {
		r = r.toString(16);
		r = r.toUpperCase();
		r.length === 1 ? r = "0" + r : r;
		g = g.toString(16);
		g = g.toUpperCase();
		g.length === 1 ? g = "0" + g : g;
		b = b.toString(16);
		b = b.toUpperCase();
		b.length === 1 ? b = "0" + b : b;
		return `#${r + g + b};`;
	}

	hex2Rgb(color) {
		var result;
		color = color.toUpperCase();
		color.match(/\#?/) ? color = color.replace("#", "") : color;
		if (color.length > 6 || color.length < 6) {
			console.error("The written color does not match the requirements: color length must be exactly 6.");
		} else {
			var r = color.substring(0, 2);
			r = parseInt(r, 16);
			var g = color.substring(2, 4);
			g = parseInt(g, 16);
			var b = color.substring(4, 6);
			b = parseInt(b, 16);
			result = `rgb(${r}, ${g}, ${b});`;
		}
		return result;
	}

	json2Array(jsonObject) {
		let temp = [];
		for(let object in jsonObject) {
			if(typeof jsonObject[object] == "object" && !jsonObject[object].isFunction()) {
				temp[object] = json2Array(jsonObject[object]);
			} else {
				temp[object] = jsonObject[object];
			}
		}
		return temp;
	}
}
function log(...args) { console.log(...args); }
function warn(msg, rep) { console.warn(msg, rep); }
function error(msg) { console.error(msg); }
function isNull(target) { return target == null ? true : false; }
function isUndefined(target) { return target == undefined ? true : false; }
function isDeclared(target) { return !isNull(target) && !isUndefined(target) ? true : false; }
function findElement(data = {}, from, fn = null) {
	if(typeof from == "object" && typeof data == "object" && data.length() > 0) {
		let parent = from.parentNode, success = false;
		if(isDeclared(data.tag) && !data.tag.isFunction()) {
			success = data.tag.toUpperCase() == parent.tagName ? true : false;
		}
		if(isDeclared(data.id) && !data.id.isFunction()) {
			success = parent.hasId(data.id) ? true : false;
		}
		if(isDeclared(data.class) && !data.class.isFunction()) {
			success = parent.hasClass(data.class) ? true : false;
		}
		//Loop function
		if(success == true) {
			return fn(parent);
		} else {
			findElement(data, parent, fn);
		}
	} else {
		console.error("Parameters must be object type.");
	}
}
//Make ajax requests
class Request {
	methods = ["POST", "GET", "PUT", "DELETE"];
	constructor(params = {
		method: "",
		url: "",
		headers: {},
		data: {},
		done: function () { },
		async: true,
		debugger: false
	}) {
		this.method = "POST";
		this.url = "";
		this.headers = {
			"Content-Type": "application/json"
		};
		this.data = null;
		this.done = isDeclared(params.done) && params.done.isFunction() ? params.done : null;
		this.async = true;
		this.debugger = false;

		this.setParams(params);
		this.xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP"); //Edge-Explorer compatibility
		this.xhr.open(this.method, this.url, this.async);
		this.setHeaders();
		this.setData(params.data);
		//Send data
		this.xhr.send(this.data);
		this.xhr.onload = () => {
			let result = [];
			result["code"] = this.xhr.status;
			result["response"] = this.xhr.statusText;
			result["return"] = this.xhr.responseText;
			result["xmlReturn"] = this.xhr.responseXML;
			if(!isNull(this.done)) {
				this.done(result);
			}
		};
	}

	setParams(data) {
		//Set method
		if (isDeclared(data.method) && this.methods.inArray(data.method.toUpperCase())) {
			this.method = data.method.toUpperCase();
		} else {
			console.error("Method parameter is not supported. Try using one of these methods: post, get, put, delete.");
		}
		//Set url
		if (isDeclared(data.url) && data.url.toString().length >= 3) {
			this.url = data.url.toString();
		} else {
			console.error("Url parameter has a length of less than 3 characters.");
		}
		//Set async process
		if (isDeclared(data.async) && Boolean(data.async) == false) {
			this.async = false;
		}
		//Set debugging infos
		if (isDeclared(data.debugger) && data.debugger.bool()) {
			this.debugger = true;
		}
		return true;
	}

	setHeaders(headers) {
		if(isDeclared(headers) && headers.length > 0) {
			for (let header in headers) {
				let value = headers[header];
				this.xhr.setRequestHeader(header, value);
			}
		}
	}

	setData(data) {
		if(isDeclared(data) && data.length() > 0) {
			let form = new FormData();
			for (let key in data) {
				let value = data[key];
				form.append(key, value);
			}this.data = form;
		}
	}
}
//These functions will execute every thing is put inside the SystemExecution array
//Works the same way of JQuery's $(document).ready(fn) as SystemFn(fn)
window.SystemExecution = [];
function SystemFn(fn) {
	if(fn !== undefined && fn !== null && typeof fn === "function" && fn.isFunction()) {
		window.SystemExecution.push(fn);
	} else {
		console.error("SystemFn expects 1 parameter and it must be a function.");
	}
}
function SystemExec() {
	let functions = win.SystemExecution, temp = [];
	functions.forEach(fn => {
		if(fn.isFunction()) temp.push(fn);
	});
	if(temp.length > 0) {
		temp.forEach(fn => fn.call());
		console.log("SystemExec: Execution finished.");
	} else {
		console.log("SystemExec: No functions were found.");
	}
}
window.onload = SystemExec;
