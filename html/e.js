import {
	isDeclared, 
	isArray, 
	isDict, 
	isFunction
} from "../utilities.js";

export default class E {
	constructor(data = {
		type: "",
		id: [],
		class: [],
		style: {},
		name: [],
		text: "",
		value: "",
		src: "",
		href: "",
		placeholder: "",
		for: "",
		attributes: {},
		children: [],
		load: function() {},
		dbclick: function() {},
		click: function() {},
		cmenu: function() {},
		hover: function() {},
		hout: function() {},
		keydown: function() {}
	}) {
		isDeclared(data.type) && data.type.length > 0 ?
			this.type = data.type :
			console.error("HTML tag must be defined");

		this.element = document.createElement(this.type);

		this.setParams(data);
		this.addChildren(data.children);
		return this.element;
	}

	setParams(data) {
		/* Set properties */
		//IDs
		if(
			isDeclared(data.id) 
			&& isArray(data.id) 
			&& data.id.length > 0
		) {
			data.id.forEach(i => this.element.addId(i));
		}

		//Classes
		if(
			isDeclared(data.class) 
			&& isArray(data.class) 
			&& data.class.length > 0
		) {
			data.class.forEach(c => this.element.addClass(c));
		}

		//Inline styles
		if(
			isDeclared(data.style) 
			&& isDict(data.style) 
			&& data.style.length > 0
		) {
			this.element.addStyles(data.style);
		}

		/* Set attributes */
		//Text content
		if(isDeclared(data.text)) {
			this.element.innerHTML = data.text;
		}

		//Value
		if(isDeclared(data.value)) {
			this.element.setAttribute("value", data.value);
		}

		//Source
		if(isDeclared(data.src) && data.src.length) {
			this.element.setAttribute("src", String(data.src));
		}

		//Header reference
		if(isDeclared(data.href)) {
			this.element.setAttribute("href", String(data.href));
		}

		//Placeholder
		if(isDeclared(data.placeholder)) {
			this.element.setAttribute("placeholder", String(data.placeholder));
		}

		//For
		if(isDeclared(data.for) && data.for.length > 0) {
			this.element.setAttribute("for", String(data.for));
		}

		//Names
		if(
			isDeclared(data.name) 
			&& isArray(data.name) 
			&& data.name.length > 0
		) {
			let temp = [];
			data.name.forEach(n => temp.push(n));
			this.element.setAttribute("name", temp.join(" "));
		}

		//Other attributes
		if(
			isDeclared(data.attributes) 
			&& isDict(data.attributes) 
			&& data.attributes.length > 0
		) {
			for (let attribute in data.attributes) {
				if(!isFunction(attribute)) {
					let value = data.attributes[attribute];
					if(!isFunction(value)) {
						this.element.setAttribute(attribute, value);
					}
				}
			}
		}

		//Inline style
		if(
			isDeclared(data.style) 
			&& isDict(data.style) 
			&& data.style.length > 0
		) {
			let styles = "";

			for (let attribute in data.style) {
				if(!isFunction(attribute)) {
					let values = data.style[attribute];

					if(!isFunction(values)) {
						styles += `${attribute}:${values};`;
					}
				}
			}

			this.element.setAttribute("style", styles);
		}

		/* Set events */
		//Creation event
		if(isDeclared(data.load) && isFunction(data.load)) {
			this.element.addEventListener("load", data.load(this.element));
		}

		//Click event
		if(isDeclared(data.click) && isFunction(data.click)) {
			this.element.addEventListener("click", data.click);
		}

		//Double click event
		if(isDeclared(data.dbclick) && isFunction(data.dbclick)) {
			this.element.addEventListener("dblclick", data.dbclick);
		}

		//Right click event
		if(isDeclared(data.cmenu) && isFunction(data.cmenu)) {
			this.element.addEventListener("contextmenu", data.cmenu);
		}

		//Mouse over event
		if(isDeclared(data.hover) && isFunction(data.hover)) {
			this.element.addEventListener("mouseover", data.hover);
		}

		//Mouse out event
		if(isDeclared(data.hout) && isFunction(data.hout)) {
			this.element.addEventListener("mouseout", data.hout);
		}

		//Keyboard event
		if(isDeclared(data.keydown) && isFunction(data.keydown)) {
			this.element.addEventListener("keydown", data.keydown);
		}
	}

	addChildren(children) {
		if(isDeclared(children) && isArray(children)) {
			children.forEach(child => {
				if(typeof child === "object") {
					this.element.appendChild(child);
				}
			});
		}
	}
}