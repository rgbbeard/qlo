var dom = document, win = window;
var ww = win.innerWidth, wh = win.innerHeight;
class Converter {
	rgb2Hex(r, g, b) {
		r = r.toString(16);
		r = r.toUpperCase();
		r.length === 1 ? r = "0"+r : r;
		g = g.toString(16);
		g = g.toUpperCase();
		g.length === 1 ? g = "0"+g : g;
		b = b.toString(16);
		b = b.toUpperCase();
		b.length === 1 ? b = "0"+b : b;
		return `#${r+g+b};`;
	}
	hex2Rgb(color) {
		var result;
		color = color.toUpperCase();
		color.match(/\#?/) ? color = color.replace("#", "") : color;
		if(color.length > 6 || color.length < 6) {
			console.log("The written color does not match the requirements: color length must be exactly 6.");
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
	base64Decode(target) {
		return atob(target);
	}
	base64Encode(target) {
		return btoa(target);
	}
}
class Element {
	constructor(data = {
		type: "",
		properties: [],
		text: "",
		children: []
	}) {
		if(typeof data !== "object" && !data.checkArray()) {
			console.error("Element data must come into an array.");
		}
		else {
			let
				t = data.type,
				p = data.properties,
				txt = data.text,
				c = data.children;
			//Check if element type is defined
			if(t !== undefined) {
				t.length > 0 && (t !== "" || t !== " ") ?
					this.element = dom.createElement(t) :
					console.error("Element type must be defined");
			}
			//Check if there are element properties
			if(p !== undefined) {
					//Check if properties are actually written into an array
					p.length > 0 && typeof p == "object" && p.checkArray() ?
						p.forEach(property=> {
							let name = property.split("@")[0];
							let value = property.split("@")[1];
							this.element.setAttribute(name, value);
						}) :
						console.error("Element properties must come into an array.");
			}
			//Check if there is text content to set
			if(txt !== undefined) {
				if(txt.length > 0 && txt !== "") this.element.innerHTML = txt;
			}
			//Check if there are children to append
			if(c !== undefined) {
				c.length > 0 && typeof c === "object" && c.checkArray() ?
					c.forEach(child=>this.element.appendChild(child)) :
					console.error("Element children must come into an array.");
			}
			return this.element;
		}
	}
}
class Toast {
	constructor(text, position, timeout = 5) {
		this.toastPositions = {
			"top-center": "toast-top-center",
			"top-left": "toast-top-left",
			"top-right": "toast-top-right",
			"center-center": "toast-center-center",
			"center-left": "toast-center-left",
			"center-right": "toast-center-right",
			"bottom-center": "toast-bottom-center",
			"bottom-left": "toast-bottom-left",
			"bottom-right": "toast-bottom-right",
		};
		position === "top-center" || position === "center-center" || position === "bottom-center" ? this.toastCentered = `left:${(ww/2)-150}px;right:${(ww/2)-150}px;` : this.toastCentered = "";
		this.toast = new Element({
			type: "div",
			properties: [
				`class@toast ${this.toastPositions[position]}`,
				`style@${this.toastCentered}`
			],
			children: [
					new Element({
					type: "div",
					properties: ["style@margin:0px auto;"],
					text: text
				})
			]
		});
		dom.body.appendChild(this.toast);
		setTimeout(()=>{
			dom.body.removeChild(this.toast);
		}, timeout * 1000);
	}
}
Array.prototype.checkArray = a=>Array.isArray(this);
Object.prototype.hasClass = c=>	this.classList.contains(c);
Object.prototype.toggleClass = function(c) {this.classList.toggle(c);}
Object.prototype.toggleClasses = function(...args) {args.forEach(c=>this.classList.toggle(c));}
Object.prototype.removeClass = function(c) {this.classList.remove(c);};
Object.prototype.removeClasses = function(...args) {args.forEach(c=>this.removeClass(c));};
Object.prototype.addClass = function(c) {this.classList.add(c);};
Object.prototype.addClasses = function(...args) {args.forEach(c=>this.addClass(c));};
Object.prototype.removeAttributes = function(...args) {args.forEach(a=>this.removeAttribute(a));};
Object.prototype.appendChildren = function(...args) {args.forEach(child=>this.appendChild(child));};
Object.prototype.removeChildren = function(...args) {args.forEach(child=>this.removeChild(child));}
Object.prototype.insertAfter = function(newElement) {this.parentNode.insertBefore(newElement, this.nextElementSibling);}
Object.prototype.lclick = function(fn) {this.addEventListener("click", fn);}
Object.prototype.rclick = function(fn) {this.addEventListener("contextmenu", fn);}
Object.prototype.hover = function(fn) {this.addEventListener("mouseover", fn);}
Object.prototype.hout = function(fn) {this.addEventListener("mouseout", fn);}
const hex2Rgb = new Converter().hex2Rgb;
const rgb2Hex = new Converter().rgb2Hex;
const decodeBase64 = new Converter().base64Decode;
const encodeBase64 = new Converter().base64Encode;
const onPageLoaded = function(func) {win.addEventListener("load", func);};
const onPageResized = function(func) {win.addEventListener("resize", func);};
