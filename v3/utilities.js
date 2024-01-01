export const
	www = String(window.location.origin + "/"), 
	ww = window.innerWidth, 
	wh = window.innerHeight;

//Select html elements
class Select {
	current = null;
	node = null;
	nodelist = null;
	multiple = false;

	constructor(selector = document.body) {
		if(selector === document.body || selector === document || selector === window) {
			this.node = selector;
		} else if((typeof selector) === "string") {
			const selection = this.node === null ?
				document.body.querySelectorAll(selector):
				this.node.querySelectorAll(selector);

			if(selection.length === 1) {
				this.node = selection[0];
			} else if(selection.length > 1) {
				this.multiple = true;
				this.nodelist = selection;
			}
		} else if(selector instanceof HTMLElement && selector?.length() === 1) {
			this.node = selector;
		} else if(selector instanceof Select) {
			if(selector.multiple) {
				this.current = selector.current;
				this.node = selector.current;
			} else {
				this.node = selector.node;
			}
		}

		return this;
	}

	getIfExists(element) {
		if(element) {
			if(element instanceof HTMLElement) {
				if(!this.multiple) {
					this.node = this.node.children.hasElement(element) ? 
						this.node.children[this.node.children.indexOf(element)] 
						: null;
				} else {
					this.current = this.current.children.hasElement(element) ? 
						this.current.children[this.current.children.indexOf(element)] 
						: null;
				}
			} else if((typeof element) === "string") {
				const selection = this.multiple ? 
						this.current?.querySelectorAll(element) 
						: this.node?.querySelectorAll(element);

				if(selection && selection.length === 1) {
					this.node = selection[0];
					this.current = null;
					this.multiple = false;
					this.nodelist = null;
				} else {
					this.node = null;
					this.current = null;
					this.multiple = true;
					this.nodelist = selection;
				}
			}
		}

		return this;
	}

	getObject() {
		const e = window.event;
		if(this.multiple) {
			for(let n = 0;n<this.nodelist.length;n++) {
				if(e.target === this.nodelist[n]) {
					return this.nodelist[n];
				}
			}
		}

		return this.node;
	}

	first() {
		if(this.multiple) {
			this.node = this.multiple[0];
			this.multiple = false;
			this.nodelist = null;
			this.current = null;
		}

		return this;
	}

	parent() {
		if(!this.multiple) {
			this.node = this.node.parentNode;
		}

		return this;
	}

	value(value = "") {
		if(this.multiple) {
			if(value.empty()) {
				return Select.isInput(this.current) ? this.current.value : this.current.textContent;
			} else {
				if(Select.isInput(this.current)) {
					this.current.value = value;
				} else {
					this.current.textContent = value;
				}
			}
		} else {
			if(value.empty()) {
				return Select.isInput(this.node) ? this.node?.value : this.node?.textContent;
			} else {
				if(Select.isInput(this.node)) {
					this.node.value = value;
				} else {
					this.node.textContent = value;
				}
			}
		}
	}

	attr(name, value = null) {
		if(name && !name.empty()) {
			if(this.multiple) {
				if(value && value.empty()) {
					return this.current.getAttribute(name);
				} else {
					this.current.setAttribute(name, value);
					return value;
				}
			} else {
				if(value && value.empty()) {
					return this.node.getAttribute(name);
				} else {
					this.node.setAttribute(name, value);
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
			if(this.multiple) {
				if(!value) {
					return this.#getPropertyByName(name);
				} else {
					Object.defineProperty(this.current, name, {
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
					Object.defineProperty(this.node, name, {
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
			target = this.multiple ? this.current : this.node,
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
			if(this.multiple) {
				if(this.current.getAttribute(value)) {
					return this.current.getAttribute(name);
				} else {
					this.current.setAttribute(name, value);
					return value;
				}
			} else {
				if(this.node.getAttribute(value)) {
					return this.node.getAttribute(name);
				} else {
					this.node.setAttribute(name, value);
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
		if(!this.multiple) {
			if(push_child?.isObject()) {
				this.current.appendChild(push_child);
			} else {
				return this.node.children;
			}
		} else {
			return this.current.children;
		}
	}

	length() {
		return this.multiple ? this.nodelist.length : 1;
	}

	each(fn) {
		if(fn.isFunction()) {
			if(this.multiple) {
			    for(let x = 0;x<this.nodelist.length;x++) {
			        const n = this.nodelist[x];
			        this.current = n;
			        if(!Select.hasHashFunction(n, "each", fn)) {
						this.#hashFunction(n, "each", fn);
						fn(n);
					}
				}
			} else {
				if(!Select.hasHashFunction(this.node, "each", fn)) {
					this.#hashFunction(this.node, "each", fn);
					fn(this.node);
				}
			}
		} else {
			console.warn("Missing function to evaluate");
		}
	}

	reset() {
		if(this.multiple) {
			for(let x = 0;x<this.nodelist.length;x++) {
				const n = this.nodelist[x];
				if(Select.isInput(n)) {
					n.value = "";
				} else {
					n.innerHTML = "";
				}
			}
		} else {
			if(Select.isInput(this.node)) {
				this.node.value = "";
			} else {
				this.node.innerHTML = "";
			}
		}

		return this;
	}

	remove() {
		if(this.multiple) {
			for(let x = 0;x<this.nodelist.length;x++) {
				const n = this.nodelist[x];
				n.parentNode.removeChild(n);
			}
		} else {
			this.node.parentNode.removeChild(this.node);
		}
	}

	on(listener_name, fn) {
		if(fn.isFunction()) {
			if(this.multiple) {
			    for(let x = 0;x<this.nodelist.length;x++) {
			        const n = this.nodelist[x];
			        this.current = n;
			        if(!Select.hasHashFunction(n, listener_name, fn)) {
						this.#hashFunction(n, listener_name, fn);
			        	n.addEventListener(listener_name, function(e) {
			        		e.currentTarget === n & fn.call();
			        	});
					}
				}
			} else {
				if(!Select.hasHashFunction(this.node, listener_name, fn)) {
					this.#hashFunction(this.node, listener_name, fn);
					this.node?.addEventListener(listener_name, function(e) {
		        		e.currentTarget === this.node & fn(e.currentTarget);
		        	});
				}
			}
		}
	}

	appendChild(child) {
		if(!this.multiple && child.isObject()) {
			this.node.appendChild(child);
		} else {
			console.warn("You cannot append the given variable");
			return;
		}
		return this;
	}

	appendChildren(...children) {
		if(!this.multiple) {
			children.forEach(child => {
				this.node.appendChild(child);
			});
		} else {
			console.warn("You cannot append to the current target");
			return;
		}
		return this;
	}

	static isInput(target) {
		const t = target && target.tagName.toLowerCase(); 
		return t === "input" || t === "textarea" || t === "button" || t === "select";
	}

	#hashFunction(target, event, fn) {
		const hash = btoa(fn);

		if(!target) {
			return;
		}

		if(target instanceof Select) {
			target = target.getObject();
		}

		if(!target.hashes) {
			target.hashes = {};
		}

		if(!target.hashes[event]) {
			target.hashes[event] = [];	
		}

		if(!target.hashes[event][hash]) {
			target.hashes[event].push(hash);
		}
	}

	static hasHashFunction(target, event, fn) {
		const hash = btoa(fn);

		if(target instanceof Select) {
			target = target.getObject();
		}

		if(target?.hashes) {
			if(!event && fn.empty()) {
				return target.hashes[event];
			} else if(!event?.empty() && !fn.empty()) {
				return target?.hashes[event] && target?.hashes[event][hash];
			}
		}

		return target?.hashes;
	}
}
export const $ = selector => new Select(selector);
export const isNull = function(target) { return target === null; };
export const isUndefined = function(target) { return target === undefined; };
export const isDeclared = function(target) { return !isNull(target) && !isUndefined(target); };
window.SystemExecution = [];
export const SystemFn = function(fn) {
	if(isDeclared(fn) && typeof fn === "function" && fn.isFunction()) {
		window.SystemExecution.push(fn);
	} else {
		console.error("SystemFn expects 1 parameter and it must be a function.");
	}
};
const SystemExec = function() {
	let functions = window.SystemExecution, temp = [];

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