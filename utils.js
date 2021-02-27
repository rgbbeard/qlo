const dom = document, win = window, body = dom.body, head = dom.head;
const www = String(win.location.origin + "/");
const ww = win.innerWidth, wh = win.innerHeight;
var debugActive = false;
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
		}
		else if(this.selectBy === ".") {
			this.result = document.querySelectorAll(selector);
		}
		else if(this.selectBy.match(/[\d|\D]/)) {
			this.result = document.querySelectorAll(selector);
		}	
		else if(this.selectBy === "[") {
			this.result = document.querySelectorAll(selector);
		}
		else if(this.selectBy === "*") {
			this.result = document.querySelectorAll(selector);
		}
		return this.result;
	}
}
const _= selector => new Selection(selector);
//Console functions 
function log(...args) { console.log(...args); }
function warn(msg, rep) { console.warn(msg, rep); }
function error(msg) { console.error(msg); }
//XHR requests
class Request {
	xhr = null;
	headers = [];
	data = [];
	done = function() {};
	debugger = false;
	constructor(params = {
		method: "get",
		url: "",
		headers: {},
		data: {},
		done: function () {},
		async: true,
		debugger: false
	}) {
		this.xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP"); //Edge-Explorer compatibility
		this.debugger = Boolean(params.debugger);
		const methods = ["get", "post", "delete", "put"];
		//Normalize method name
		let method = params.method.toString().toLowerCase();
		//Check essential variables
		if(params.url.length > 0 && params.url !== undefined && params.url !== null && methods.inArray(method)) {
			if(params.async !== undefined && typeof params.async == "boolean") asyncReq = bool(params.async); 

			this.xhr.open(method.toUpperCase(), params.url, true);

			if(params.headers !== undefined && params.headers.isArray() && params.headers.length > 0) {
				this.headers = params.headers;
				this.setHeaders();
			} else {
				this.headers = {
					"Content-type": 'application/x-www-form-urlencoded'
				};
				this.setHeaders();
			}

			if(params.data !== undefined && params.data.isArray() && params.data.length > 0) this.data = params.data;

			if(params.done !== null && params.done !== undefined && params.done.isFunction()) this.done = params.done;

			switch(method.toString()) {
				case "post":
					this.post();
					break;

				case "get":
					this.get();
					break;
			}
		} else error("Method or Url parameters have not valid values.");
	}

	setHeaders() {
		for(let name in this.headers) {
			let header = String(name), value = String(this.headers[name]); 
			this.xhr.setRequestHeader(header, value);
		}
	}

	post() {
		let post = new FormData();
		for(let key in this.data) {
			let name = String(key), value = this.data[key];
			if(!name.isFunction() && !value.isFunction()) {
				post.append(name, value);
			}
		}
		this.this.send(post);
	}

	get() {
		this.send();
	}

	send(content = null) {
		if(content !== null) {
			this.xhr.send(content);
		}
		let func = this.done;
		this.xhr.onload = function() {
			if(this.status == 200) func(this.responseText, this.responseXML);
			else if(this.debugger == true && this.status !== 200) {
				log("The request didn't succeed.\nMore infos below:", this);
			}
		};
	}
}
//Converter functions
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
			error("The written color does not match the requirements: color length must be exactly 6.");
		}
		else {
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
}
const hex2Rgb = new Converter().hex2Rgb;
const rgb2Hex = new Converter().rgb2Hex;
function checkFields(...args) {
	for (let x = 0; x < args.length; x++) {
		if (args[x].empty() === true) return false;
	}
	return true;
}
function json2Array(jsonObject) {
	let temp = [];
    for(let object in jsonObject) {
        if(typeof jsonObject[object] == "object" && !jsonObject[object].isFunction()) {
            temp[object] = json2Array(jsonObject[object]);
        } else temp[object] = jsonObject[object];
    }
    return temp;
}
function SystemExec() {
	let functions = win.SystemExecution, temp = [];
	functions.forEach(fn => {
		if(fn.isFunction()) temp.push(fn);
	});
	if(temp.length > 0) {
		temp.forEach(fn => fn.call());
		log("SystemExec: Execution finished.");
	} else log("SystemExec: No functions were found.");
}