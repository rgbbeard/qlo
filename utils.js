/*
	JavaScript library
		Latest@17-12-2020
*/
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
function print(...args) { console.log(...args); }
function error(msg) { console.error(msg); }
//XHR requests
class Request {
	constructor(request = {
		method: "",
		url: "",
		data: [],
		done: function () { }
	}) {
		const xhr = new XMLHttpRequest();
		const methods = ["GET", "POST"];
		//Check method
		if (request.method === undefined) {
			error("Method parameter is required.");
		}
		else {
			if (methods.inArray(request.method) === true && typeof request.method === "string" && request.method.length > 0) {
				//Check url
				if (request.url === undefined || request.url === null || typeof request.url !== "string" && request.url.length > 0) {
					error("Url parameter is required.");
				}
				else {
					xhr.open(request.method, request.url);
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					//GET method
					if (request.method.toUpperCase() === "GET") {
						if (request.done !== undefined && request.done !== null && request.done.isFunction() === true) {
							xhr.load(function () {
								request.done(xhr.status, xhr.response);
							});
						}
					}
					//POST method
					else if (request.method.toUpperCase() === "POST") {
						if (request.data !== undefined && request.data !== null) {
							let data = [];
							for (let key in request.data) {
								if (request.data.hasOwnProperty(key)) {
									data.push(`${key}=${request.data[key]}`);
								}
							}
							xhr.send(data.join("&"));
							if (request.done !== undefined && request.done !== null && request.done.isFunction() === true) {
								xhr.load(function () {
									request.done(xhr.status, xhr.response);
								});
							}
						}
						else {
							error("Data parameter in post request is required.");
						}
					}
				}
			}
			else {
				error("Methods can only be GET or POST.");
			}
		}
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