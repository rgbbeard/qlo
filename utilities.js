const dom = document, win = window, www = String(window.location.origin + "/"), ww = window.innerWidth, wh = window.innerHeight;
//Select html elements
class Select {
	#node = null;
	#nodelist = null;
	#multiple = false;

	constructor(selector = document.body) {
		if(selector === document.body) {
			this.#node = selector;
		} else if((typeof selector) === "string") {
			this.#node = document.querySelector(selector);
		}

		return this;
	}

	getIfExists(element) {
		if(!(element === null || element === undefined)) {
			if(element instanceof HTMLElement) {
				this.#node = this.#node.children.hasElement(element) ? this.#node.children[this.#node.children.indexOf(element)] : null;
			} else if(element instanceof String) {
				let selection = this.#node.querySelector(element);

				if(selection.length === 1) {
					this.#node = selection;
					this.#nodelist = null;
				} else {
					this.#node = null;
					this.#multiple = true;
					this.#nodelist = selection;
				}
			}
		}

		return this;
	}

	value(value = "") {
		if(value.empty()) {
			if(!this.#multiple) {
				return this.#nodelist?.value;
			} else if(this.#multiple && this.#nodelist.length > 0) {
				this.#nodelist.forEach(n => {
					// not yet implemented
				});
			}
		}
	}

	children(push_child = null) {
		if(push_child?.isObject()) {
			this.#node.appendChild(push_child);
		} else {
			if(!this.#multiple) {
				return this.#node.children;
			} else {
				// not yet implemented
			}
		}
	}

	length() {
		return this.#multiple ? this.#nodelist.length : 1;
	}

	#resetValues() {
		this.#node = null;
		this.#nodelist = null;
		this.#multiple = false;

		return this;
	}

	static isUsable(target) {
		return this.constructor.name === target?.constructor.name;
	}
}
const $ = selector => new Select(selector);
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
const isNull = function(target) { return target == null ? true : false; };
const isUndefined = function(target) { return target == undefined ? true : false; };
const isDeclared = function(target) { return !isNull(target) && !isUndefined(target) ? true : false; };
const findElement = function(data = {}, from, fn = null) {
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
};
//Make ajax requests
class Request {
	methods = ["POST", "GET", "PUT", "DELETE"];
	constructor(params = {
		method: "",
		url: "",
		send_files: false,
		headers: {},
		data: {},
		done: function () {},
		async: true,
		debugger: false
	}) {
		this.method = "POST";
		this.url = "";
		this.data = null;
		this.done = isDeclared(params.done) && params.done.isFunction() ? params.done : null;
		this.async = true;
		this.debugger = false;

		this.setParams(params);
		this.xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP"); //Edge-Explorer compatibility
		this.xhr.open(this.method, this.url, this.async);

		if(!isDeclared(params.headers) || params.headers.length() < 1) {
			params.headers = {};
		}

		params.headers["Content-Type"] = "application/json";
		if(isDeclared(params.headers) && params.headers.length > 0) {
			for (let header in params.headers) {
				let value = params.headers[header];
				this.xhr.setRequestHeader(header, value);
			}
		}

		this.setData(params.data);

		if(isDeclared(params.send_files) && params.send_files == true) {
			this.xhr.overrideMimeType("multipart/form-data");
		}

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

	setData(data) {
		if(isDeclared(data) && data.length() > 0) {
			let form = new FormData();

			for(let key in data) {
				let value = data[key];

				if(!value.isFunction()) {
					if(isDeclared(value.type) && value.type === "file") { //This one for file upload
						for(let f = 0;f<value.files.length;f++) {
							form.append(`${key}[]`, value.files[f], value.files[f].name);
						}
					} else {
						form.append(key, value);
					}
				}
			}
			this.data = form;
		}
	}
}
//These functions will execute every thing is put inside the SystemExecution array
//Works the same way of JQuery's $(document).ready(fn) as SystemFn(fn)
window.SystemExecution = [];
const SystemFn = function(fn) {
	if(isDeclared(fn) && typeof fn === "function" && fn.isFunction()) {
		window.SystemExecution.push(fn);
	} else {
		console.error("SystemFn expects 1 parameter and it must be a function.");
	}
};
const SystemExec = function() {
	let functions = win.SystemExecution, temp = [];

	functions.forEach(fn => {
		if(fn.isFunction()) {
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
