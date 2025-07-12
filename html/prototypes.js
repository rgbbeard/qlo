import {isDeclared, isUndefined} from "../utilities.js";
import {E} from "./e.js";
import Contextmenu from "./contextmenu.js";
import ConfirmDialog from "./confirmdialog.js";
import Toast from "./toast.js";
import Interface from "./interface.js";

const Elements = Element || Interface || ConfirmDialog || Toast || Contextmenu || E;
const QloObject = Object || Elements || HTMLObjectElement;

QloObject.prototype.hasClass = function(c) {
	return this.classList.contains(String(c));
};
QloObject.prototype.toggleClass = function(c) {
	this.classList.toggle(String(c));
};
QloObject.prototype.toggleClasses = function(...args) {
	args.forEach(c => this.classList.toggle(String(c)));
};
QloObject.prototype.removeClass = function(c) {
	this.classList.remove(String(c));
};
QloObject.prototype.removeClasses = function(...args) {
	args.forEach(c => this.removeClass(String(c)));
};
QloObject.prototype.addClass = function(c) {
	this.classList.add(String(c));
};
QloObject.prototype.addClasses = function(...args) {
	args.forEach(c => this.addClass(String(c)));
};
QloObject.prototype.removeAttributes = function(...args) {
	args.forEach(a => this.removeAttribute(String(a)));
};
QloObject.prototype.appendChildren = function(...args) {
	args.forEach(child => this.appendChild(child));
};
QloObject.prototype.removeChildren = function(...args) {
	args.forEach(child => this.removeChild(child));
};
QloObject.prototype.insertAfter = function(...args) { 
	args.forEach(a => {
		this.parentNode.insertBefore(a, this.nextElementSibling);
	});
};
QloObject.prototype.isFirstChild = function() {
	return this === this.parentNode.children[0];
};
QloObject.prototype.isLastChild = function() {
	let
		parent = this.parentNode,
		c = parent.children,
		ls = parent.children[c.length - 1];

	return this === ls;
};
QloObject.prototype.prevSibling = function() {
	return this.isFirstChild() ? null : this.previousElementSibling;
};
QloObject.prototype.nextSibling = function() {
	return this.isLastChild() ? null : this.nextElementSibling;
}
QloObject.prototype.moveBefore = function() {
    let 
    	parent = this.parentNode, 
    	prev = this.previousElementSibling;

	if(!isNull(prev)) {
		parent.insertBefore(this, prev);
	}
};
QloObject.prototype.moveAfter = function() {
	let 
		parent = this.parentNode,
		next = this.nextElementSibling, 
		nextIsLast = isNull(next.nextElementSibling);

	if(!isNull(next)) {
		let index = parent.children.elementIndex(next);

		if(!nextIsLast) {
			parent.insertBefore(this, parent.children[index+1]);
		} else {
			parent.appendChild(this);
		}
	}
};
QloObject.prototype.removeId = function(id) {
	if (this.getAttribute("id") !== null) {
		let 
			ids = this.getAttribute("id").split(" "),
			i = ids.indexOf(id.toString());

		ids = ids.splice(i, i);
		ids.length > 0 ?
	    	this.setAttribute("id", ids.join(" ")):
	        this.removeAttribute("id");
	}
};
QloObject.prototype.addId = function(id) {
	if (this.getAttribute("id") == null) {
		this.setAttribute("id", id);
	} else {
		let ids = this.getAttribute("id").split(" "), hasId = false;

		for (let x = 0; x < ids.length; x++) {
			if (ids[x] === id) {
				hasId = true;
				break;
			}
		}

		if (hasId === false) {
			this.setAttribute("id", ids.join(" "));
		}
	}
};
QloObject.prototype.hasId = function(id) {
	let ids = this.getAttribute("id");

	if(!isNull(ids)) {
		ids = ids.split(" ");
		ids.forEach(i => {
			if(i === id.toString()) {
				return true;
			}
		});
	}

	return false;
};
QloObject.prototype.elementIndex = function(element) {
	for (let i = 0; i < this.children.length; i++) {
		if (this.children[i] === element) {
			return i;
		}
	}

	return -1;
};
QloObject.prototype.addStyles = function(styles = {}) {
	let temp = [];

	for(let style in styles) {
		if(styles[style].isFunction()) {
			continue;
		}
		temp.push(String(style+":"+styles[style]));
	}

	let
		prev_styles = this.getAttribute("style"),
		new_styles = temp.join(";");
	let style = prev_styles + ";" + new_styles;

	if(prev_styles == null) {
		style = new_styles;
	}

	this.setAttribute("style", style);
};
QloObject.prototype.isDisabled = function() {
	return isNull(this.getAttribute("disabled"));
};
QloObject.prototype.rippleAnimation = function(e) {
	e = window.event;
	let t = e.target;

	t.removeClass("animated");

	if (!t.hasClass("animated")) {
		t.addClass("animated");
	}

	setTimeout(function() {
		t.removeClass("animated");
	}, 700);
};
QloObject.prototype.stretch = function(properties = "width, height", value) {
	if (!this.parentNode || !this.style) return;

	this.parentHeight = this.parentNode.offsetHeight;
	this.parentWidth = this.parentNode.offsetWidth;

	if (
		typeof properties === "string" &&
		properties.toLowerCase() === "proportional" &&
		typeof value === "number"
	) {
		this.style.height = (this.parentHeight * value) + "px";
		this.style.width = (this.parentWidth * value) + "px";
		return;
	}

	const 
		[prop1, prop2] = properties.split(",").map(p => p.trim()),
		[width, height] = typeof value === "string" ?
			value.split(",").map(m => m.trim()):
			["match_parent", "match_parent"];

	if(properties === "all") {
		this.style.width = `${value}px`;
		this.style.height = `${value}px`;
	}

	if(width === "match_parent") {
		this.style.width = `${this.parentWidth}px`;
	} else {
		this.style.width = `${width}px`;
	}

	if(height === "match_parent") {
		this.style.height = `${this.parentHeight}px`;
	} else {
		this.style.height = `${height}px`;
	}
};
QloObject.prototype.instance = function(instance) {
	return this instanceof instance;
};
QloObject.prototype.mousepos = function(e) {
	if (isUndefined(e)) e = window.event;
	let
		pos = this.getBoundingClientRect(),
		posX = e.clientX - pos.left,
		posY = e.clientY - pos.top;
	return {
		x: posX,
		y: posY
	};
};
QloObject.prototype.getPadding = function(padding = "global") {
	let target = this;
	if (!isDeclared(padding) || padding.empty()) {
		padding = "global";
	}
	
	switch (String(padding).toLowerCase()) {
		case (padding.match(/(,)+/)):
			let 
				pads = padding.split(","),
				p = [];
			for (let x = 0; x < pads.length; x++) {
				const pd = window.getComputedStyle(target, null)
					.getPropertyValue("padding-" + pads[x].rmwhitesp());
				p.push(
					pads[x].rmwhitesp(), 
					parseFloat(pd)
				);
			}
			return p;
		case (padding.rmwhitesp() === "global"):
			return {
				top: parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-top")),
					right: parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-right")),
					bottom: parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-bottom")),
					left: parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-left")),
			};
		case (["top", "right", "bottom", "left"].inArray(padding)):
			switch (padding) {
				case "top":
					return parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-top"));
				case "right":
					return parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-right"));
				case "bottom":
					return parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-bottom"));
				case "left":
					return parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-left"));
			}
			break;
		default:
			return {
				top: parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-top")),
					right: parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-right")),
					bottom: parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-bottom")),
					left: parseFloat(window.getComputedStyle(target, null).getPropertyValue("padding-left")),
			};
	}
};
QloObject.prototype.applyGravity = function(endpoint = "parent", planet = "earth") {
	let 
		acceleration = 9.81,
		velocity = 0,
		parent = this.parentNode,
		bpad = parent.getPadding("bottom").double();

	this.held = isDeclared(this.held) ? this.held : false;

	if(!planet.match(/earth/i)) return; // only earth implemented

	if(this.style.top.empty()) {
		this.style.top = "0px";
	}

	const tick = () => {
		if(!this.held) {
			velocity += acceleration;
			let 
				currentTop = this.style.top.double(),
				maxTop = parent.offsetHeight - bpad - this.offsetHeight;

			if(currentTop < maxTop) {
				currentTop = Math.min(currentTop + velocity, maxTop);
				this.style.top = currentTop + "px";
			}
		} else {
			velocity = 0;
		}
		requestAnimationFrame(tick);
	};
	tick();
};
QloObject.prototype.isQloObject = function() {
	return this.instance(QloObject);
};
QloObject.prototype.attachTo = function(element) {
	if (element.isQloObject() || element?.instance(QloObject)) {
		let
			ot = element.getBoundingClientRect().top,
			ep = element.getPadding(),
			eh = element.offsetHeight,
			top = ot + ep.top + (eh / 2);

		this.addStyles({
			"top": top + "px",
		});
	}
};
QloObject.prototype.isHidden = function() {
	return this.hasAttribute("hidden") || this.hasClass("hidden");
};
QloObject.prototype.hide = function() {
	if (!this.isHidden()) {
		this.setAttribute("hidden", "");
	}
};
QloObject.prototype.show = function() {
	if (this.isHidden()) {
		this.removeAttribute("hidden");
	}
};
QloObject.prototype.clearUp = function() {
	this.innerHTML = "";
};
QloObject.prototype.txt = function(t) {
	if (isDeclared(t)) {
		this.innerHTML = t;
	}
	return this.innerText;
};
QloObject.prototype.parentUntilClass = function(value, element = null) {
	if(value && !value.empty()) {
		let target = element ?? this;

		if(target.hasClass(value)) {
			return target;
		}

		return target.parentUntilClass(value, target.parentNode);
	}
};