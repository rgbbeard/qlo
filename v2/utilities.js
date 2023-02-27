const dom = document, win = window, www = String(window.location.origin + "/"), ww = window.innerWidth, wh = window.innerHeight;
//Select html elements
class Select {
	#current = null;
	#node = null;
	#nodelist = null;
	#multiple = false;

	constructor(selector = document.body) {
		if(selector === document.body) {
			this.#node = selector;
		} else if((typeof selector) === "string") {
			if(this.#node === null) {
				this.#node = document.body;
			}

			const selection = this.#node.querySelectorAll(selector);

			if(selection.length === 1) {
				this.#node = selection[0];
				this.#nodelist = null;
			} else {
				this.#multiple = true;
				this.#nodelist = selection;
			}
		} else if(selector instanceof HTMLElement && selector?.length() === 0) {
			this.#node = selector;
		}

		return this;
	}

	getIfExists(element) {
		if(isDeclared(element)) {
			if(element instanceof HTMLElement) {
				this.#node = this.#node.children.hasElement(element) ? this.#node.children[this.#node.children.indexOf(element)] : null;
			} else if((typeof element) === "string") {
				const selection = this.#node.querySelectorAll(element);

				if(selection.length === 1) {
					this.#node = selection[0];
					this.#current = null;
					this.#multiple = false;
					this.#nodelist = null;
				} else {
					this.#node = null;
					this.#current = null;
					this.#multiple = true;
					this.#nodelist = selection;
				}
			}
		}

		return this;
	}

	first() {
		if(this.#multiple) {
			this.#node = this.#multiple[0];
			this.#multiple = false;
			this.#nodelist = null;
			this.#current = null;
		}

		return this;
	}

	value(value = "") {
		if(this.#multiple) {
			if(value.empty()) {
				return Select.isInput(this.#current) ? this.#current.value : this.#current.textContent;
			} else {
				if(Select.isInput(this.#current)) {
					this.#current.value = value;
				} else {
					this.#current.textContent = value;
				}
			}
		} else {
			if(value.empty()) {
				return Select.isInput(this.#node) ? this.#node.value : this.#node.textContent;
			} else {
				if(Select.isInput(this.#node)) {
					this.#node.value = value;
				} else {
					this.#node.textContent = value;
				}
			}
		}
	}

	attr(name, value = null) {
		if(name && !name.empty()) {
			if(this.#multiple) {
				if(value && value.empty()) {
					return this.#current.getAttribute(name);
				} else {
					this.#current.setAttribute(name, value);
					return value;
				}
			} else {
				if(value && value.empty()) {
					return this.#node.getAttribute(name);
				} else {
					this.#node.setAttribute(name, value);
					return value;
				}
			}
		} else {
			console.warn("Missing attribute name");
			return;
		}
	}

	prop(name, value = null, editable = false) {
		if(!name?.empty()) {
			if(this.#multiple) {
				if(!value) {
					return this.#getPropertyByName(name);
				} else {
					Object.defineProperty(this.#current, name, {
			                value: value,
			                writable: editable,
			                configurable: true
			        });
					return value;
				}
			} else {
				if(!value) {
					const property_value = this.#getPropertyByName(name);
					return property_value;
				} else {
					Object.defineProperty(this.#node, name, {
			                value: value,
			                writable: editable,
			                configurable: true
			        });
					return value;
				}
			}
		} else {
			console.warn("Missing property name");
			return;
		}
	}

	#getPropertyByName(name) {
		let result = null;
		const
			target = this.#multiple ? this.#current : this.#node,
			properties = Object.getOwnPropertyNames(target);

		for(let x = 0;x<properties.length;x++) {
			if(name === properties[x]) {
				result = properties[x];
				break;
			}
		}

		return result;
	}

	/*
	WIP
	attributes(attributes = null) {
		if(attributes && attributes.length() > 0) {
			if(this.#multiple) {
				if(this.#current.getAttribute(value)) {
					return this.#current.getAttribute(name);
				} else {
					this.#current.setAttribute(name, value);
					return value;
				}
			} else {
				if(this.#node.getAttribute(value)) {
					return this.#node.getAttribute(name);
				} else {
					this.#node.setAttribute(name, value);
					return value;
				}
			}
		} else {
			console.warn("Missing attribute name");
			return;
		}
	}
	*/

	children(push_child = null) {
		if(!this.#multiple) {
			if(push_child?.isObject()) {
				this.#current.appendChild(push_child);
			} else {
				return this.#node.children;
			}
		} else {
			return this.#current.children;
		}
	}

	length() {
		return this.#multiple ? this.#nodelist.length : 1;
	}

	each(fn) {
		if(fn.isFunction()) {
			if(this.#multiple) {
			    for(let x = 0;x<this.#nodelist.length;x++) {
			        const n = this.#nodelist[x];
			        this.#current = n;
					fn(this);
				}
			} else {
				fn(this);
			}
		} else {
			console.warn("Missing function to evaluate");
			return this;
		}

		return this;
	}

	reset() {
		if(this.#multiple) {
			for(let x = 0;x<this.#nodelist.length;x++) {
				const n = this.#nodelist[x];
				if(Select.isInput(n)) {
					n.value = "";
				} else {
					n.innerHTML = "";
				}
			}
		} else {
			if(Select.isInput(this.#node)) {
				this.#node.value = "";
			} else {
				this.#node.innerHTML = "";
			}
		}

		return this;
	}

	remove() {
		if(this.#multiple) {
			for(let x = 0;x<this.#nodelist.length;x++) {
				const n = this.#nodelist[x];
				n.parentNode.removeChild(n);
			}
		} else {
			this.#node.parentNode.removeChild(this.#node);
		}
	}

	on(listener_name, fn) {
		if(this.#multiple && fn.isFunction()) {
		    for(let x = 0;x<this.#nodelist.length;x++) {
		        const n = this.#nodelist[x];
		        this.#current = n;
		        n.addEventListener(listener_name, (n = n) => {fn(n);});
			}
		} else {
			this.#node?.addEventListener(listener_name, (n = n) => {fn(n);});
		}
	}

	appendChild(child) {
		if(!this.#multiple && child.isObject()) {
			this.#node.appendChild(child);
		} else {
			console.warn("You cannot append the given variable");
			return;
		}
		return this;
	}

	appendChildren(...children) {
		if(!this.#multiple) {
			children.forEach(child => {
				this.#node.appendChild(child);
			});
		} else {
			console.warn("You cannot append to the current target");
			return;
		}
		return this;
	}

	static isInput(target) {
		const t = target.tagName.toLowerCase(); 
		return t === "input" || t === "textarea" || t === "button" || t === "select";
	}
}
const $ = selector => new Select(selector);
class Converter {
	static rgb2Hex(r, g, b) {
		r = r.toString(16).toUpperCase();
		r.length === 1 ? r = "0" + r : r;
		g = g.toString(16).toUpperCase();
		g.length === 1 ? g = "0" + g : g;
		b = b.toString(16).toUpperCase();
		b.length === 1 ? b = "0" + b : b;
		return `#${r}${g}${b};`;
	}

	static hex2Rgb(color) {
		color = color.trim().toUpperCase();
		color.match(/^\#?/) ? color = color.replace("#", "") : color;

		if (color.length !== 6) {
			console.error("The written color does not match the requirements: color length must be exactly 6.");
			return;
		} else {
			const 
				r = parseInt(color.substring(0, 2), 16),
				g = parseInt(color.substring(2, 4), 16),
				b = parseInt(color.substring(4, 6), 16);
			
			return `rgb(${r}, ${g}, ${b});`;
		}
	}

	static json2Array(jsonObject) {
		let temp = [];
		for(let object in jsonObject) {
			if(!jsonObject[object].isFunction()) {
				temp.push(object);
				if(typeof jsonObject[object] === "object") {
					temp[object] = this.json2Array(jsonObject[object]);
				} else {
					temp[object] = jsonObject[object];
				}
			}
		}
		return temp;
	}
}
const isNull = function(target) { return target === null; };
const isUndefined = function(target) { return target === undefined; };
const isDeclared = function(target) { return !isNull(target) && !isUndefined(target); };
const findElement = function(data = {}, from, fn = null) {
	if(typeof from == "object" && typeof data == "object" && data.length() > 0) {
		let parent = from.parentNode, success = false;
		if(data.tag?.isFunction()) {
			success = data.tag.toUpperCase() == parent.tagName ? true : false;
		}
		if(data.id?.isFunction()) {
			success = parent.hasId(data.id);
		}
		if(data.class?.isFunction()) {
			success = parent.hasClass(data.class);
		}
		//Loop function
		if(success) {
			return fn(parent);
		} else {
			findElement(data, parent, fn);
		}
	} else {
		console.error("Parameters must be object type.");
		return;
	}
};
//Make ajax requests
class Request {
	#methods = ["POST", "GET", "PUT", "DELETE"];
	#method = "POST";
	#url = "";
	#data = null;
	#done = null;
	#xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP"); //Edge-Explorer compatibility;

	constructor(params = {
		method: "",
		url: "",
		send_files: false,
		headers: {},
		data: {},
		done: function () {}
	}) {
		if(isDeclared(params.done) && params.done.isFunction()) {
			this.#done = params.done;
		}

		this.setParams(params);
		
		this.#xhr.open(this.#method, this.#url, true);

		if(!isDeclared(params.headers) || params.headers.length() === 0) {
			params.headers = {};
		}

		params.headers["Content-Type"] = "application/json";
		if(isDeclared(params.headers) && params.headers.length > 0) {
			for (let header in params.headers) {
				const value = params.headers[header];
				this.#xhr.setRequestHeader(header, value);
			}
		}

		this.setData(params.data);

		if(isDeclared(params.send_files) && params.send_files == true) {
			this.#xhr.overrideMimeType("multipart/form-data");
		}

		//Send data
		this.#xhr.send(this.data);
		this.#xhr.onload = () => {
			let result = [];
			result["code"] = this.#xhr.status;
			result["response"] = this.#xhr.statusText;
			result["return"] = this.#xhr.responseText;
			result["xmlReturn"] = this.#xhr.responseXML;

			if(!isNull(this.#done)) {
				this.#done(result);
			}
		};

		return this;
	}

	setParams(data) {
		//Set method
		if (isDeclared(data.method) && this.#methods.inArray(data.method.toUpperCase())) {
			this.#method = data.method.toUpperCase();
		} else {
			console.error("Method parameter is not supported. Try using one of these methods: post, get, put, delete.");
		}

		//Set url
		if (isDeclared(data.url) && data.url.toString().length > 0) {
			this.#url = data.url.toString();
		} else {
			console.error("Url parameter must have a length of at least 1 character.");
		}

		return this;
	}

	setData(data) {
		if(isDeclared(data) && data.length() > 0) {
			const form = new FormData();

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

		return this;
	}
}
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