//Create new document element
class Element {
	constructor(data = {
		type: "",
		id: [],
		class: [],
		style: [],
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
			this.type = data.type:
			error("HTML tag must be defined");

		this.element = dom.createElement(this.type);

		if(this.setParams(data)) {
			this.addChildren(data.children);
			return this.element;
		}
	}

	setParams(data) {
		/* Set properties */
		//IDs
		if(isDeclared(data.id) && data.id.isArray() && data.id.length > 0) data.id.forEach(i => this.element.addId(i));
		//Classes
		if(isDeclared(data.class) && data.class.isArray() && data.class.length > 0) data.class.forEach(c => this.element.addClass(c));
		//Inline styles
		if(isDeclared(data.style) && typeof data.style === "object" && data.styles.length() > 0) this.element.addStyles(data.style);
		
		/* Set attributes */
		//Text content
		if(isDeclared(data.text)) this.element.innerHTML = String(data.text);
		//Value
		if(isDeclared(data.value)) this.element.setAttribute("value", data.value);
		//Source
		if(isDeclared(data.src) && data.src.length) this.element.setAttribute("src", String(data.src))
		//Header reference
		if(isDeclared(data.href)) this.element.setAttribute("href", String(data.href));
		//Placeholder
		if(isDeclared(data.placeholder)) this.element.setAttribute("placeholder", String(data.placeholder));
		//For
		if(isDeclared(data.for) && data.for.length > 0) this.element.setAttribute("for", String(data.for));
		//Names
		if(isDeclared(data.name) && data.name.isArray() && data.name.length > 0) {
			let temp = [];
			data.name.forEach(n => temp.push(n));
			this.element.setAttribute("name", temp.join(" "));
		}
		//Other attributes
		if(isDeclared(data.attributes) && typeof data.attributes == "object" && data.attributes.length() > 0) {
			for(let attribute in data.attributes) {
				if(!attribute.isFunction()) {
					let values = data.attributes[attribute];
					if(!values.isFunction()) {
						this.element.setAttribute(attribute, values.join(" "));
					}
				}
			}
		}

		/* Set events */
		//Creation event
		if(isDeclared(data.load) && data.load.isFunction()) this.element.addEventListener("load", data.load); 
		//Click event
		if(isDeclared(data.click) && data.click.isFunction()) this.element.addEventListener("click", data.click); 
		//Double click event
		if(isDeclared(data.dbclick) && data.dbclick.isFunction()) this.element.addEventListener("dblclick", data.dbclick); 
		//Right click event
		if(isDeclared(data.cmenu) && data.cmenu.isFunction()) this.element.addEventListener("contextmenu", data.cmenu); 
		//Mouse over event
		if(isDeclared(data.hover) && data.hover.isFunction()) this.element.addEventListener("mouseover", data.hover); 
		//Mouse out event
		if(isDeclared(data.hout) && data.hout.isFunction()) this.element.addEventListener("mouseout", data.hout); 
		//Keyboard event
		if(isDeclared(data.keydown) && data.keydown.isFunction()) this.element.addEventListener("keydown", data.keydown); 
		return true;
	}

	addChildren(children) {
		if(isDeclared(children) && children.isArray()) {
			children.forEach(child => {
				if(typeof child === "object") {
					this.element.appendChild(child);
				}
			});
		}
	}
}
//Script tag
class Script {
	constructor(data = {
		type: "",
		src: "",
		defer: false,
		async: false,
		charset: ""
	}) {
		let props = [];
		if (data.src === null && data.src === undefined) {
			if (data.src.length < 1 || data.src.empty() === true) error("File path must be declared.");
		}
		else {
			this.src = data.src.toString();
			//Force type attribute to avoid Element.properties error
			if (data.type !== null && data.type !== undefined) {
				if (data.type.empty() === false && data.type.length > 0) props.push("type@" + data.type.toString());
			}
			else {
				props.push("type@text/javascript");
			}
			//Search for other options
			if (data.defer !== null && data.defer !== undefined && data.defer !== false) {
				if (data.defer === true) props.push("defer@true");
			}
			if (data.async !== null && data.async !== undefined && data.async !== false) {
				if (data.async === true) props.push("async@true");
			}
			if (data.charset !== null && data.charset !== undefined) {
				if (data.charset > 0) props.push("charset@" + data.charset);
			}
		}
		return new Element({
			type: "script",
			properties: props,
			src: this.src
		});
	}
}
//Interface object
class Interface {
	constructor(data = {
		title: "Lorem ipsum",
		body: []
	}) {
		let interfaceTitle = isDeclared(data.title) ? String(data.title) : "";
		this.body = [];
		let element = new Element({
			type: "div",
			id: ["interface"+(_(".interface-background").length+1)],
			class: ["interface-background"],
			children: [
				//Interface winow
				new Element({
					type: "div",
					class: ["interface-window"],
					children: [
						//Header container
						new Element({
							type: "div",
							class: ["interface-head"],
							children: [
								//Header title
								new Element({
									type: "span",
									class: ["interface-head-title"],
									text: interfaceTitle
								}),
								//Header actions container
								new Element({
									type: "span",
									class: ["interface-head-actions-container"],
									children: [
										//Header reduce btn
										new Element({
											type: "span",
											class: ["interface-head-reduce-btn", "btn-custom", "btn-warning"],
											text: "&mdash;",
											click: function() {
												findElement({
													tag: "div",
													class: "interface-background"
												}, this, bg => {
													let ID = bg.getAttribute("id");
													bg.style.display = "none";
													document.body.appendChild(new Element({
														type: "span",
														class: ["reduced-interface-btn", "btn-custom", "btn-white"],
														text: "Finestra &#007;",
														attributes: {
															title: ["Riprendi finestra: "+interfaceTitle]
														},
														click: function() {
															_("#"+ID).style.display = "initial";
															this.parentNode.removeChild(this);
														}
													}));
												});
											}
										}),
										//Header close btn
										new Element({
											type: "span",
											class: ["interface-head-close-btn", "btn-custom", "btn-error"],
											text: "X",
											click: function() {
												findElement({
													tag: "div",
													class: "interface-background"
												}, this, interfaceWindow => {
													interfaceWindow.parentNode.removeChild(interfaceWindow);
												});
											}
										})
									]
								})
							]
						}),
						//Body container
						new Element({
							type: "div",
							class: ["interface-body"],
							children: this.body
						})
					]
				})
			]
		});

		this.setParams(data);
		return element;
	}

	setParams(data) {
		//Check body
		if(isDeclared(data.body) && data.body.isArray() && data.body.length > 0) this.body = data.body;
	}
}
//Android-like toast object
class Toast {
	constructor(data = {
		text: "",
		position: "",
		timeout: 0
	}) {
		this.toastCentered = "";
		this.timeout = data.timeout > 0 ? data.timeout : 5;
		switch (data.position) {
			case "top-center":
				this.toastPosition = "toast-top-center";
				this.toastCentered = `left:${(ww / 2) - 150}px;right:${(ww / 2) - 150}px;`;
				break;
			case "center-center":
				this.toastPosition = "toast-center-center";
				this.toastCentered = `left:${(ww / 2) - 150}px;right:${(ww / 2) - 150}px;`;
				break;
			case "bot-center":
				this.toastPosition = "toast-bottom-center";
				this.toastCentered = `left:${(ww / 2) - 150}px;right:${(ww / 2) - 150}px;`;
				break;
			case "top-left":
				this.toastPosition = "toast-top-left";
				break;
			case "top-right":
				this.toastPosition = "toast-top-right";
				break;
			case "center-left":
				this.toastPosition = "toast-center-left";
				break;
			case "center-right":
				this.toastPosition = "toast-center-right";
				break;
			case "bot-left":
				this.toastPosition = "toast-bot-left";
				break;
			case "bot-right":
				this.toastPosition = "toast-bot-right";
				break;
			default:
				this.toastPosition = "toast-bottom-center";
				this.toastCentered = `left:${(ww / 2) - 150}px;right:${(ww / 2) - 150}px;`;
				break;
		}
		this.toast = new Element({
			type: "div",
			properties: [
				`class@toast ${this.toastPosition}`,
				`style@${this.toastCentered}`
			],
			children: [
				new Element({
					type: "div",
					properties: ["style@margin:0px auto;"],
					text: data.text
				})
			]
		});
		dom.body.appendChild(this.toast);
		setTimeout(() => {
			dom.body.removeChild(this.toast);
		}, this.timeout * 1000);
	}
}
//Text switchbox object
class TextSwitchbox {
	constructor(data = {
		description: "",
		name: "",
		textOn: "On",
		textOff: "Off",
		bgcOn: "#fff",
		bgcOff: "#fff",
		colorOn: "#333",
		colorOff: "#333",
		valueOn: 1,
		valueOff: 0,
		checked: null,
		onCheck: function () {}
	}) {
		let name = data.name.empty() ?
			"tsb-" + _(".text-switchbox").length :
			data.name.replace(/\s+/g, "_");
		if (name[0].match(/[0-9]/)) {
			name = "tsb-" + name;
			print("Input names cannot begin with numbers, name replaced with: " + name);
		}
		let
			children = [],
			btnProps = ["for@" + data.name];
		if (data.description.empty() === false) children.push(
			new Element({
				type: "p",
				text: data.description
			})
		);
		children.push(
			new Element({
				type: "input",
				properties: [
					"id@" + name,
					"type@text",
					"hidden@true",
					"name@" + name
				]
			})
		);
		/* Add button properties */
		if (data.textOn.empty() === false) btnProps.push("text-on@" + data.textOn);
		if (data.textOff.empty() === false) btnProps.push("text-off@" + data.textOff);
		if (data.bgcOn.empty() === false) btnProps.push("bgc-on@" + data.bgcOn);
		if (data.bgcOff.empty() === false) btnProps.push("bgc-off@" + data.bgcOff);
		if (data.colorOn.empty() === false) btnProps.push("color-on@" + data.colorOn);
		if (data.colorOff.empty() === false) btnProps.push("color-on@" + data.colorOff);
		if (data.valueOn.empty() === false) btnProps.push("value-on@" + data.valueOn);
		if (data.valueOff.empty() === false) btnProps.push("value-on@" + data.valueOff);
		if (data.checked === false && data.checked.bool() === true) btnProps.push("button-checked@true");
		let btn = new Element({
			type: "label",
			properties: btnProps
		});
		/* Check if button has a click function */
		if (data.onCheck.empty() === false && data.onCheck.isFunction() === true) {
			btn.onclick(() => {
				if (this.attr("button-checked") !== null && this.attr("button-checked").bool() === true) {
					data.onCheck.call();
				}
			});
		}
		children.push(btn);
		let i = new Element({
			type: "div",
			properties: ["class@text-switchbox"],
			children: children
		});
		return i;
	}
}
//Confirm window object
class Confirm {
	constructor(data = {
		confirmAction: undefined,
		cancelAction: undefined,
		cancelText: "",
		confirmText: "",
		deleteOnConfirm: true,
		deleteOnCancel: true,
		title: ""
	}) {
		this.cancelText = "Annulla";
		this.confirmText = "Conferma";
		this.confirmAction = function() {};
		this.cancelAction = function() {};
		this.deleteOnCancel = true;
		this.deleteOnConfirm = true;

		this.setParams(data);

		let confirmId = "#confirm_dialog_" + (_(".confirm-window-background").length + 1);
		let confirm = new Element({
			type: "div",
			id: [confirmId],
			class: ["confirm-window-background"],
			children: [
				new Element({
					type: "div",
					class: ["confirm-window-content"],
					children: [
						new Element({
							type: "h3",
							class: ["confirm-window-title"],
							text: String(data.title)
						}),
						new Element({
							type: "span",
							class: ["btn-custom", "btn-white"],
							text: this.cancelText,
							click: () => {
								this.cancelAction.call();
								if (this.deleteOnCancel === true) this.deleteWindow();
							}
						}),
						new Element({
							type: "span",
							class: ["btn-custom", "btn-error"],
							text: String(data.confirmText),
							click: () => {
								this.confirmAction.call();
								if (this.deleteOnConfirm === true) this.deleteWindow();
							}
						})
					]
				})
			]
		});
		this.confirm = confirm;
		return confirm;
	}

	setParams(data) {
		//Set cancel button text
		if(isDeclared(data.cancelText)) this.cancelText = String(data.cancelText);
		//Set confirm button text
		if(isDeclared(data.confirmText)) this.confirmText = String(data.confirmText);
		//Perform action on confirmation
		if(isDeclared(data.confirmAction) && data.confirmAction.isFunction()) this.confirmAction = data.confirmAction;
		//Perform action on cancelation
		if(isDeclared(data.cancelAction) && data.cancelAction.isFunction()) this.cancelAction = data.cancelAction;
		//Remove confirmation window on button click
		if(isDeclared(data.deleteOnCancel) && Boolean(data.cancel) === false) this.deleteOnCancel = false;
		if(isDeclared(data.deleteOnConfirm) && Boolean(data.deleteOnConfirm) === false) this.deleteOnConfirm = false;
	}

	deleteWindow() {
		this.confirm.parentNode.removeChild(this.confirm);
	}
}
//3D cube object
class Cube {
	constructor(data = {
		size: 0,
		images: {
			top: "",
			right: "",
			bottom: "",
			left: "",
			front: "",
			back: ""
		},
		labels: {
			top: "1",
			right: "2",
			bottom: "3",
			left: "4",
			front: "5",
			back: "6"
		},
		useGlobalColor: false,
		borderRadius: 0,
		borderWidth: 1,
		colors: {
			top: "background-color:#00000055;",
			right: "background-color:#00000055;",
			bottom: "background-color:#00000055;",
			left: "background-color:#00000055;",
			front: "background-color:#00000055;",
			back: "background-color:#00000055;"
		},
		globalColor: "",
		transparency: false,
		transparencies: [],
		globalTransparency: 0.5,
		randomRotate: true,
		rotationTimeout: 1
	}) {
		let size = 120;
		if (data.size !== null && data.size !== undefined && data.size > 10) size = data.size;
		//Set default labels
		var
			topLabel = "1",
			rightLabel = "2",
			botLabel = "3",
			leftLabel = "4",
			frontLabel = "5",
			backLabel = "6";
		if (data.labels !== undefined && data.labels !== null) {
			topLabel = data.labels.top;
			rightLabel = data.labels.right;
			botLabel = data.labels.bottom;
			leftLabel = data.labels.left;
			frontLabel = data.labels.front;
			backLabel = data.labels.back;
		}
		//Set default colors
		var
			topBg = "#00000088;",
			rightBg = "#00000088;",
			botBg = "#00000088;",
			leftBg = "#00000088;",
			frontBg = "#00000088;",
			backBg = "#00000088;";
		if (data.colors !== undefined) {
			topBg = `#${data.colors.top}`;
			rightBg = `#${data.colors.right}`;
			botBg = `#${data.colors.bottom}`;
			leftBg = `#${data.colors.left}`;
			frontBg = `#${data.colors.front}`;
			backBg = `#${data.colors.back}`;
		}
		else if (data.useGlobalColor === true && data.globalColor.length.inRange(6, 8) === true) {
			topBg = `#${data.globalColor}`;
			rightBg = `#${data.globalColor}`;
			botBg = `#${data.globalColor}`;
			leftBg = `#${data.globalColor}`;
			frontBg = `#${data.globalColor}`;
			backBg = `#${data.globalColor}`;
		}

		if (data.randomRotate === true) properties.push(`autorotate@${data.rotationTimeout}`);
		let b = new Element({
			type: "div",
			class: ["cube"],
			style: {
				"display": "inline-block",
				"margin": "40px",
				"transition": "all 1.5s",
				"position": "relative",
				"transform-style": "preserve-3d",
				"width": `${size}px`,
				"height": `${size}px`,
				"user-select": "none"
			},
			children: [
				//Front face
				new Element({
					type: "div",
					class:["cube-face"],
					style: {
						"border-radius": `${data.borderRadius}px`,
						"border": `solid ${data.borderWidth}px #000`,
						"background-color": `${frontBg}`,
						"position": "absolute",
						"width": "100%",
						"height": "100%",
						"font-size": `${(size / 2) - 10}px`,
						"font-weight": "bold",
						"color": "#fff",
						"text-align": "center",
						"transform": `rotateY(0deg) translateZ(${size / 2}px)`,
						"line-height": `${size}px`
					},
					text: frontLabel.toString()
				}),
				//Back face
				new Element({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${backBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateY(180deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: backLabel.toString()
				}),
				//Top face
				new Element({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${topBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateX(90deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: topLabel.toString()
				}),
				//Right face
				new Element({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${rightBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateY(90deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: rightLabel.toString()
				}),
				//Bottom face
				new Element({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${botBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateX(-90deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: botLabel.toString()
				}),
				//Left face
				new Element({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${leftBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateY(-90deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: leftLabel.toString()
				})
			]
		});
		return b;
	}
}
//Menu object
class Menu {
	constructor(data = {
		title: null,
		voices: {},
		closeOnClickOut: true,
		closeOnClickOver: true
	}) {
		this.closeMenus();
		this.title = isDeclared(data.title) ? String(data.title) : "Menu";
		this.menuParams = {
			type: "div",
			id: ["contextmenu"],
			class: ["contextmenu"],
			children: [
				new Element({
					type: "h4",
					id: ["menu-title"],
					text: this.title
				})
			]
		};
		this.setParams(data);
		let menu = new Element(this.menuParams);
		this.setMenuPos(menu);
		return menu;
	}

	closeMenus() {
		_(".contextmenu").forEach(m => m.parentNode.removeChild(m));
	}

	setParams(data) {
		let voices = data.voices;
		if(isDeclared(voices)) {
			if(typeof voices == "object" && !voices.isFunction()) {
				//Add menu voices
				for(let voice in voices) {
					let value = voices[voice];
					if(!value.isFunction() && typeof value == "object" && isDeclared(value.label)) {
						let params = {
							type: "a",
							class: ["contextmenu-item"],
							text: value.label
						};
						//Add action
						if(isDeclared(value.click) && value.click.isFunction()) params.click = () => {
							value.click.call();
							this.closeMenus();
						};
						this.menuParams.children.push(new Element(params));
					}
				}
			} else warn("Expected object.");
		} else warn("Expected menu voices.");
		
		//Add close menu btn
		this.menuParams.children.push(new Element({
			type: "a",
			class: ["contextmenu-item"],
			text: "Chiudi",
			click: () => {
				this.closeMenus();
			}
		}));
	}

	setMenuPos(menu, e) {
		if (isUndefined(e)) e = win.event;
		let top = document.body.mousepos().y+"px", left = document.body.mousepos().x+"px";
		menu.addStyles({
			"top": top,
			"left": left
		});
	}
}

const element = Element || Interface || Confirm || Script || Cube || Toast || TextSwitchbox || Menu;
const axl = Object || element;

axl.prototype.stretch = function(properties = "width, height", mode = "match_parent, match_parent") {
	this.parentHeight = this.parentNode.offsetHeight;
	this.parentWidth = this.parentNode.offsetWidth;

	if(properties === "width" && mode !== "match_parent") {
		if(mode[mode.length-1] == "%") {
			let width = this.parentNode.offsetWidth;
			width = width.percentage(parseInt(mode));
			this.style.width = width+"px";
		}
		else if(mode[mode.length-1] == "px") {
			let width = this.parentNode.style.width - parseInt(mode);
			this.style.width = width+"px";
		}
	}
	else if(properties == "width" && mode == "match_parent") {
		this.style.width = this.parentWidth+"px";
	}
	
	else if(properties.match(/height/i) && mode.split(",")[1].match(/match_parent/i)) {
		this.style.height = this.parentHeight+"px";
	}
	
	else if(properties.match(/all/i) && mode.match(/match_parent/i)) {
		this.style.width = this.parentNode.offsetWidth+"px";
		this.style.height = this.parentNode.offsetHeight+"px";
	}
};
//Beta
axl.prototype.focused = function (fn) {
	let f = this.focus();
	if (f === true) fn.call();
};
axl.prototype.instance = function(instance) {
	return this instanceof instance ? true : false;
};
axl.prototype.mousepos = function (e) {
	if (isUndefined(e)) e = win.event;
	let
		pos = this.getBoundingClientRect(),
		posX = e.clientX - pos.left,
		posY = e.clientY - pos.top;
	return {
		x: posX,
		y: posY
	};
};
axl.prototype.getPadding = function (padding = "global") {
	let target = this;
	if (padding !== "global") {
		switch (padding) {
			case "top":
				return parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-top"));
			case "right":
				return parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-right"));
			case "bottom":
				return parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-bottom"));
			case "left":
				return parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-left"));
		}
	}
	else if (padding.match(/(\,)+/)) {
		let pads = padding.split(","), p = [];
		for (let x = 0; x < pads.length; x++) {
			p.push(pads[x].rmwhitesp(), parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-" + pads[x].rmwhitesp())));
		}
	}
	//Default
	else if (padding.match(/global/i)) {
		return {
			top: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-top")),
			right: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-right")),
			bottom: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-bottom")),
			left: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-left")),
		};
	}
};
