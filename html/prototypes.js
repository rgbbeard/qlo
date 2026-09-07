import {isDeclared, isUndefined, isFunction, isDict} from "../utilities.js";
import E from "./e.js";
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
	"hasClass": {
		"get": false,
		"set": false,
		"value": function(c) {
			return this.classList.contains(String(c));
		}
	},
	"toggleClass": {
		"get": false,
		"set": false,
		"value": function(c) {
			this.classList.toggle(String(c));
		}
	},
	"toggleClasses": {
		"get": false,
		"set": false,
		"value": function(...args) {
			args.forEach(c => this.classList.toggle(String(c)));
		}
	},
	"removeClass": {
		"get": false,
		"set": false,
		"value": function(c) {
			this.classList.remove(String(c));
		}
	},
	"removeClasses": {
		"get": false,
		"set": false,
		"value": function(...args) {
			args.forEach(c => this.removeClass(String(c)));
		}
	},
	"addClass": {
		"get": false,
		"set": false,
		"value": function(c) {
			this.classList.add(String(c));
		}
	},
	"addClasses": {
		"get": false,
		"set": false,
		"value": function(...args) {
			args.forEach(c => this.addClass(String(c)));
		}
	},
	"removeAttributes": {
		"get": false,
		"set": false,
		"value": function(...args) {
		args.forEach(a => this.removeAttribute(String(a)));
		}
	},
	"removeId": {
		"get": false,
		"set": false,
		"value": function(id) {
			const current = this.getAttribute("id");

			if(current) {
				let ids = current.split(" ")
					.filter(x => x !== String(id));

				if(ids.length > 0) {
					this.setAttribute("id", ids.join(" "));
				} else {
					this.removeAttribute("id");
				}
			}
		}
	},
	"addId": {
		"get": false,
		"set": false,
		"value": function(id) {
			const current = this.getAttribute("id");

			if(!current) {
				this.setAttribute("id", id);
			} else {
				let ids = current.split(" ");

				if(!ids.includes(String(id))) {
					this.setAttribute("id", ids.join(" ") + ` ${id}`);
				}
			}
		}
	},
	"hasId": {
		"get": false,
		"set": false,
		"value": function(id) {
			const ids = this.getAttribute("id");
			return ids !== null && ids.split(" ").includes(String(id));
		}
	},
	"hasAttribute": {
		"get": false,
		"set": false,
		"value": function(attr) {
			return isDeclared(this.getAttribute(attr));
		}
	},
	"instance": {
		"get": false,
		"set": false,
		"value": function(instance) {
			return this instanceof instance;
		}
	},
	"mousepos": {
		"get": true,
		"set": false,
		"value": function(e = window.event) {
			const rect = this.getBoundingClientRect();

			if(!e) {
				e = window.event;
			}

			return {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top
			};
		}
	},
	"getPadding": {
		"get": false,
		"set": false,
		"value": function(padding = "global") {
			const 
				styles = window.getComputedStyle(this, null),
				pad = (side) => {
					return parseFloat(
						styles.getPropertyValue(`padding-${side}`)
					) || 0;
				},
				top = pad("top"), 
				right = pad("right"), 
				bottom = pad("bottom"), 
				left = pad("left");

			if(padding.includes(",")) {
				return padding.split(",")
					.map(p => p.trim())
					.map(side => [side, pad(side)]);
			}
			
			if(padding.toLowerCase() === "global") {
				return { top, right, bottom, left };
			}
			
			if(["top", "right", "bottom", "left"].includes(padding)) {
				return pad(padding);
			}

			return { top, right, bottom, left };
		}
	},
	"isDisabled": {
		"get": true,
		"set": false,
		"value": function() {
			return this.hasAttribute("disabled");
		}
	},
	"isHidden": {
		"get": true,
		"set": false,
		"value": function() {
			return this.hasAttribute("hidden") 
				|| this.hasClass("hidden");
		}
	},
	"hide": {
		"get": false,
		"set": false,
		"value": function() {
			if(!this.isHidden) this.setAttribute("hidden", "");
		}
	},
	"show": {
		"get": false,
		"set": false,
		"value": function() {
			if(this.isHidden) this.removeAttribute("hidden");
		}
	},
	"addStyles": {
		"get": false,
		"set": false,
		"value": function(styles = {}) {
			const 
				inlineStyles = Object.entries(styles)
					.filter(([, v]) => typeof v !== "function")
					.map(([k, v]) => `${k}:${v}`)
					.join(";"),
				prev = this.getAttribute("style"),
				s = prev ? prev + ";" + inlineStyles : inlineStyles;

			this.setAttribute("style", s);
		}
	},
	"attachTo": {
		"get": false,
		"set": false,
		"value": function(element) {
			const 
				rect = element.getBoundingClientRect(),
				padding = element.getPadding(),
				top = rect.top 
					+ padding.top 
					+ (element.offsetHeight / 2);

			this.addStyles({ top: `${top}px` });
		}
	},
	"appendChildren": {
		"get": false,
		"set": false,
		"value": function(...args) {
			this.append(...args);
		}
	},
	"appendAt": {
		"get": false,
		"set": false,
		"value": function(target, index) {
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
		}
	},
	"removeChildren": {
		"get": false,
		"set": false,
		"value": function() {
			this.forEach(child => child.remove());
		}
	},
	"insertAfter": {
		"get": false,
		"set": false,
		"value": function(...args) {
			args.forEach(a => this.parentNode.insertBefore(a, this.nextElementSibling));
		}
	},
	"isFirstChild": {
		"get": true,
		"set": false,
		"value": function() {
			return this === this.parentNode.children[0];
		}
	},
	"isLastChild": {
		"get": true,
		"set": false,
		"value": function() {
			const parent = this.parentNode;
			return this === parent.children[parent.children.length - 1];
		}
	},
	"prevSibling": {
		"get": true,
		"set": false,
		"value": function() {
			return this.isFirstChild() ? null : this.previousElementSibling;
		}
	},
	"nextSibling": {
		"get": true,
		"set": false,
		"value": function() {
			return this.isLastChild() ? null : this.nextElementSibling;
		}
	},
	"moveBefore": {
		"get": false,
		"set": false,
		"value": function() {
			const prev = this.previousElementSibling;

			if(prev) {
				this.parentNode.insertBefore(this, prev);
			}
		}
	},
	"moveAfter": {
		"get": false,
		"set": false,
		"value": function() {
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
		}
	},
	"elementIndex": {
		"get": false,
		"set": false,
		"value": function(element) {
			return Array.from(this.children).indexOf(element);
		}
	},
	"stretch": {
		"get": false,
		"set": false,
		"value": function(properties = "width, height", value) {
			if(!this.parentNode || !this.style) return;

			const parentHeight = this.parentNode.offsetHeight;
			const parentWidth = this.parentNode.offsetWidth;

			if(
				typeof properties === "string" 
				&& properties.toLowerCase() === "proportional" 
				&& typeof value === "number"
			) {
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
				this.style.width = width === "match_parent" ? 
					`${parentWidth}px` : 
					`${width}px`;

				this.style.height = height === "match_parent" ? 
					`${parentHeight}px` : 
					`${height}px`;
			}
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
    Object.entries(extensions).forEach(([name, conf]) => {
        const descriptor = {
            configurable: false
        };

        if (conf.get === true) {
            descriptor.get = conf.value;
            descriptor.set = conf.set === true ? function(v) {} : undefined;
        } else {
            descriptor.value = conf.value;
            descriptor.writable = false;
        }

        Object.defineProperty(proto, name, descriptor);
    });
});


// TODO: rewrite these functionalities
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