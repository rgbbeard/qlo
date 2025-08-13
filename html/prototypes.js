import {
	isDeclared, 
	isUndefined, 
	isFunction
} from "../utilities.js";
import {E} from "./e.js";
import Contextmenu from "./contextmenu.js";
import ConfirmDialog from "./confirmdialog.js";
import Toast from "./toast.js";
import Interface from "./interface.js";

/**
 * Shared prototypes
 * 
 * hasClass
 * toggleClass
 * toggleClasses
 * removeClass
 * removeClasses
 * addClass
 * addClasses
 * removeAttributes
 * removeId
 * addId
 * hasId
 * instance
 * mousepos
 * getPadding
 * isHidden
 * isDisabled
 * hide
 * show
 * addStyles
 * attachTo
 * appendChildren
 * removeChildren
 * insertAfter -> lets you move the element to a specific position
 * isFirstChild
 * isLastChild
 * prevSibling -> gets the previous element in the NodeList
 * nextSibling -> gets the next element in the NodeList
 * moveBefore -> moves the element ahead of the element next to it
 * moveAfter -> moves the element behind of the element next to it
 * elementIndex -> returns the index of an element in the NodeList
 * stretch -> manipulates the size of an element
 */
const extensions = {
	hasClass(c) {
		return this.classList.contains(String(c));
	},
	toggleClass(c) {
		this.classList.toggle(String(c));
	},
	toggleClasses(...args) {
		args.forEach(c => this.classList.toggle(String(c)));
	},
	removeClass(c) {
		this.classList.remove(String(c));
	},
	removeClasses(...args) {
		args.forEach(c => this.removeClass(String(c)));
	},
	addClass(c) {
		this.classList.add(String(c));
	},
	addClasses(...args) {
		args.forEach(c => this.addClass(String(c)));
	},
	removeAttributes(...args) {
		args.forEach(a => this.removeAttribute(String(a)));
	},
	removeId(id) {
		const current = this.getAttribute("id");
		if(current) {
			let ids = current.split(" ").filter(x => x !== String(id));
			if(ids.length > 0) {
				this.setAttribute("id", ids.join(" "));
			} else {
				this.removeAttribute("id");
			}
		}
	},
	addId(id) {
		const current = this.getAttribute("id");
		if(!current) {
			this.setAttribute("id", id);
		} else {
			let ids = current.split(" ");
			if(!ids.includes(String(id))) {
				this.setAttribute("id", ids.join(" ") + ` ${id}`);
			}
		}
	},
	hasId(id) {
		const ids = this.getAttribute("id");
		return ids !== null && ids.split(" ").includes(String(id));
	},
	instance(instance) {
		return this instanceof instance;
	},
	mousepos(e = window.event) {
		const rect = this.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	},
	getPadding(padding = "global") {
		const styles = window.getComputedStyle(this, null);
		const pad = side => parseFloat(styles.getPropertyValue(`padding-${side}`)) || 0;

		const top = pad("top"), right = pad("right"), bottom = pad("bottom"), left = pad("left");

		if(padding.includes(",")) {
			return padding.split(",").map(p => p.trim()).map(side => [side, pad(side)]);
		}
		if(padding.toLowerCase() === "global") {
			return { top, right, bottom, left };
		}
		if(["top", "right", "bottom", "left"].includes(padding)) {
			return pad(padding);
		}
		return { top, right, bottom, left };
	},
	isHidden() {
		return this.hasAttribute("hidden") || this.hasClass("hidden");
	},
	isDisabled() {
		return this.hasAttribute("disabled");
	},
	hide() {
		if(!this.isHidden()) this.setAttribute("hidden", "");
	},
	show() {
		if(this.isHidden()) this.removeAttribute("hidden");
	},
	addStyles(styles = {}) {
		const inlineStyles = Object.entries(styles)
			.filter(([, v]) => typeof v !== "function")
			.map(([k, v]) => `${k}:${v}`)
			.join(";");

		const prev = this.getAttribute("style");
		this.setAttribute("style", prev ? prev + ";" + inlineStyles : inlineStyles);
	},
	attachTo(element) {
		const rect = element.getBoundingClientRect();
		const padding = element.getPadding();
		const top = rect.top + padding.top + (element.offsetHeight / 2);

		this.addStyles({ top: `${top}px` });
	},
	appendChildren(...args) {
		this.append(...args);
	},
	appendAt(target, index) {
		if(!this.childNodes || this.childNodes.length === 0) {
			this.appendChild(target);
			return;
		}

		if(index < 0 || index > this.childNodes.length) {
			index = 0;
		}

		if(index === this.childNodes.length) {
			this.appendChild(target);
		} else {
			const referenceNode = this.childNodes[index];
			this.insertBefore(target, referenceNode);
		}
	},
	removeChildren(...args) {
		args.forEach(child => child.remove());
	},
	insertAfter(...args) {
		args.forEach(a => this.parentNode.insertBefore(a, this.nextElementSibling));
	},
	isFirstChild() {
		return this === this.parentNode.children[0];
	},
	isLastChild() {
		const parent = this.parentNode;
		return this === parent.children[parent.children.length - 1];
	},
	prevSibling() {
		return this.isFirstChild() ? null : this.previousElementSibling;
	},
	nextSibling() {
		return this.isLastChild() ? null : this.nextElementSibling;
	},
	moveBefore() {
		const prev = this.previousElementSibling;
		if(prev) {
			this.parentNode.insertBefore(this, prev);
		}
	},
	moveAfter() {
		const next = this.nextElementSibling;
		if(next) {
			const parent = this.parentNode;
			const index = Array.from(parent.children).indexOf(next);
			if(index < parent.children.length - 1) {
				parent.insertBefore(this, parent.children[index + 1]);
			} else {
				parent.appendChild(this);
			}
		}
	},
	elementIndex(element) {
		return Array.from(this.children).indexOf(element);
	},
	stretch(properties = "width, height", value) {
		if(!this.parentNode || !this.style) return;

		const parentHeight = this.parentNode.offsetHeight;
		const parentWidth = this.parentNode.offsetWidth;

		if(typeof properties === "string" && properties.toLowerCase() === "proportional" && typeof value === "number") {
			this.style.height = `${parentHeight * value}px`;
			this.style.width = `${parentWidth * value}px`;
			return;
		}

		const [width, height] = typeof value === "string"
			? value.split(",").map(m => m.trim())
			: ["match_parent", "match_parent"];

		if(properties === "all") {
			this.style.width = `${value}px`;
			this.style.height = `${value}px`;
		} else {
			this.style.width = width === "match_parent" ? `${parentWidth}px` : `${width}px`;
			this.style.height = height === "match_parent" ? `${parentHeight}px` : `${height}px`;
		}
	}
};

[
	E.prototype,
	Interface.prototype,
	ConfirmDialog.prototype,
	Toast.prototype,
	Contextmenu.prototype,
	Element.prototype,
	HTMLObjectElement.prototype
].forEach(proto => {
	Object.entries(extensions).forEach(([name, fn]) => {
		Object.defineProperty(proto, name, {
			value: fn,
			writable: false,
			configurable: false
		});
	});
});


// TODO: rewrite this functionality
/*QloObject.prototype.rippleAnimation = function(e) {
	e = window.event;
	let t = e.target;

	t.removeClass("animated");

	if(!t.hasClass("animated")) {
		t.addClass("animated");
	}

	setTimeout(function() {
		t.removeClass("animated");
	}, 700);
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
};*/