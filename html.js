//Create new document element
class E {
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
			this.type = data.type:
			console.error("HTML tag must be defined");

		this.element = dom.createElement(this.type);

		this.setParams(data);
		this.addChildren(data.children);
		return this.element;
	}

	setParams(data) {
		/* Set properties */
		//IDs
		if(isDeclared(data.id) && data.id.isArray() && data.id.length > 0) {
			data.id.forEach(i => this.element.addId(i));
		}
		//Classes
		if(isDeclared(data.class) && data.class.isArray() && data.class.length > 0) {
			data.class.forEach(c => this.element.addClass(c));
		}
		//Inline styles
		if(isDeclared(data.style) && typeof data.style === "object" && data.style.length() > 0) {
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
		if(isDeclared(data.name) && data.name.isArray() && data.name.length > 0) {
			let temp = [];
			data.name.forEach(n => temp.push(n));
			this.element.setAttribute("name", temp.join(" "));
		}
		//Other attributes
		if(isDeclared(data.attributes) && typeof data.attributes == "object" && data.attributes.length() > 0) {
			for(let attribute in data.attributes) {
				if(!attribute.isFunction()) {
					let value = data.attributes[attribute];
					if(!value.isFunction()) {
						this.element.setAttribute(attribute, value);
					}
				}
			}
		}
                //Inline style
                if(isDeclared(data.style) && typeof data.style == "object" && data.style.length() > 0) {
                        let styles = "";

			for(let attribute in data.style) {
				if(!attribute.isFunction()) {
					let values = data.style[attribute];

					if(!values.isFunction()) {
                                                styles += `${attribute}:${values};`;
					}
				}
			}

                        this.element.setAttribute("style", styles);
		}

		/* Set events */
		//Creation event
		if(isDeclared(data.load) && data.load.isFunction()) {
			this.element.addEventListener("load", data.load);
		}
		
		//Click event
		if(isDeclared(data.click) && data.click.isFunction()) {
			this.element.addEventListener("click", data.click);
		} 
		//Double click event
		if(isDeclared(data.dbclick) && data.dbclick.isFunction()) {
			this.element.addEventListener("dblclick", data.dbclick);
		} 
		//Right click event
		if(isDeclared(data.cmenu) && data.cmenu.isFunction()) {
			this.element.addEventListener("contextmenu", data.cmenu);
		} 
		//Mouse over event
		if(isDeclared(data.hover) && data.hover.isFunction()) {
			this.element.addEventListener("mouseover", data.hover);
		} 
		//Mouse out event
		if(isDeclared(data.hout) && data.hout.isFunction()) {
			this.element.addEventListener("mouseout", data.hout);
		} 
		//Keyboard event
		if(isDeclared(data.keydown) && data.keydown.isFunction()) {
			this.element.addEventListener("keydown", data.keydown);
		}
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
//Interface object
class Interface {
	constructor(data = {
		title: "Lorem ipsum",
		body: []
	}) {
                this.interface_components = [];

                if(isDeclared(data.title) && isDeclared(data.body)) {
                        if(data.body.isArray() && data.body.length > 0) {
                                data.body.forEach(c => {
                                        this.interface_components.push(c);
                                });

                                let interface_id = "interface-" + _(".interface-background").length + 1;
                                let close_btn = new E({
                                        type: "span",
                                        id: [interface_id],
                                        class: ["interface-close-btn", "btn-ripple", "round", "error"],
                                        text: "x"
                                });

                                let interface_title_bar = new E({
                                        type: "div",
                                        class: ["interface-title-bar"],
                                        children: [
                                                close_btn,
                                                new E({
                                                        type: "h4",
                                                        text: String(data.title)
                                                })
                                        ]
                                });

                                let interface_body = new E({
                                        type:  "div",
                                        class: ["interface-body"],
                                        children: this.interface_components
                                });

                                let element = new E({
                                        type: "div",
                                        class: ["interface"],
                                        children: [
                                                interface_title_bar,
                                                interface_body
                                        ]
                                });

                                let interface_background = new E({
                                        type: "div",
                                        class: ["interface-background"],
                                        children: [element]
                                });
                                
                                document.body.appendChild(interface_background);

                                close_btn.onclick = function() {
                                        document.body.removeChild(interface_background);
                                };
                        } else {
                                console.error("Body parameter expected to be not an empty array");
                        }
                } else {
                        console.error("Interface object expects 2 parameters");
                }
	}
}
//Android-like toast object
class Toast {
	constructor(data = {
		text: "",
		position: "",
		timeout: 0,
                appearance: ""
	}) {
		this.timeout = parseInt(data.timeout) > 0 ? data.timeout : 5;
		this.classes = ["toast"];

		switch (data.position) {
			case "top-center":
				this.classes.push("top");
				this.classes.push("center");
				break;
                        case "center-top":
				this.classes.push("top");
				this.classes.push("center");
				break;
			case "bot-center":
				this.classes.push("bot");
				this.classes.push("center");
				break;
			case "bottom-center":
				this.classes.push("bot");
				this.classes.push("center");
				break;
			case "top-left":
				this.classes.push("top");
				this.classes.push("left");
				break;
			case "top-right":
				this.classes.push("top");
				this.classes.push("right");
				break;
			case "center-left":
				this.classes.push("left");
				this.classes.push("center");
				break;
			case "center-right":
				this.classes.push("right");
				this.classes.push("center");
				break;
			case "bot-left":
				this.classes.push("bot");
				this.classes.push("left");
				break;
			case "bot-right":
				this.classes.push("bot");
				this.classes.push("right");
				break;
			case "bottom-left":
				this.classes.push("bot");
				this.classes.push("left");
				break;
			case "bottom-right":
				this.classes.push("bot");
				this.classes.push("right");
				break;
			default:
				this.classes.push("bot");
				this.classes.push("center");
				break;
		}

		if(isDeclared(data.appearance) && !data.appearance.isFunction()) {
			switch(String(data.appearance)) {
				case "success":
					this.classes.push("success");
					break;
				case "green":
					this.classes.push("success");
					break;
				case "error":
					this.classes.push("error");
					break;
				case "red":
					this.classes.push("error");
					break;
				case "warning":
					this.classes.push("warning");
					break;
				case "yellow":
					this.classes.push("warning");
					break;
				case "orange":
					this.classes.push("warning");
					break;
			}
		}

		this.toast = new E({
			type: "div",
			class: this.classes,
			attributes: {
				"script-generated": "true"
			},
			children: [
				new E({
					type: "div",
					text: data.text
				})
			]
		});
		document.body.appendChild(this.toast);
		setTimeout(() => {
			document.body.removeChild(this.toast);
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
			new E({
				type: "p",
				text: data.description
			})
		);
		children.push(
			new E({
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
		let btn = new E({
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
		let i = new E({
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
		let confirm = new E({
			type: "div",
			id: [confirmId],
			class: ["confirm-window-background"],
			children: [
				new E({
					type: "div",
					class: ["confirm-window-content"],
					children: [
						new E({
							type: "h3",
							class: ["confirm-window-title"],
							text: String(data.title)
						}),
						new E({
							type: "span",
							class: ["btn-custom", "btn-white"],
							text: this.cancelText,
							click: () => {
								this.cancelAction.call();
								if (this.deleteOnCancel === true) this.deleteWindow();
							}
						}),
						new E({
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
		if(isDeclared(data.deleteOnCancel) && Boolean(data.deleteOnConfirm) === false) this.deleteOnCancel = false;
		if(isDeclared(data.deleteOnConfirm) && Boolean(data.deleteOnConfirm) === false) this.deleteOnConfirm = false;
	}

	deleteWindow() {
		this.confirm.parentNode.removeChild(this.confirm);
	}
}
//Popup with buttons
class Popup {
	constructor(data = {
		title: "",
		buttons: {}
	}) {
		this.popupWindow = null;
		this.element = null;
		this.title = isDeclared(data.title) ? data.title : "Messaggio";
		this.setParams(data);

		this.popupWindow = new E({
			type: "div",
			class: ["confirm-window-background"],
			children: [this.element]
		});

		return this.popupWindow;
	}

	setParams(data) {
		let	element_children = [
			new E({
				type: "h3",
				class: ["confirm-window-title"],
				text: this.title
			})
		];

		if(isDeclared(data.buttons) && !data.buttons.isFunction() && data.buttons.length() > 0) {
			let button_count = 1;

			for(let button in data.buttons) {
				button = data.buttons[button];

				if(button.isFunction()) {
					continue;
				}

				let	compiled_button_options = {
					type: "span",
					id: [`popup_button_${button_count}`],
					class: ["popup-button", "btn-custom"],
					text: (isDeclared(button.text) ? button.text : `Button ${button_count}`)
				};

				if(isDeclared(button.click) && button.click.isFunction()) {
					compiled_button_options.click = function() {
						button.click.call();
						this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
					};
				}

				if(isDeclared(button.appearance)) {
					switch(String(button.appearance)) {
						case "default":
							compiled_button_options.class.push("btn-white");
							break;

						case "white":
							compiled_button_options.class.push("btn-white");
							break;

						case "danger":
							compiled_button_options.class.push("btn-warning");
							break;	

						case "orange":
							compiled_button_options.class.push("btn-warning");
							break;	

						case "success":
							compiled_button_options.class.push("btn-default");
							break;	

						case "green":
							compiled_button_options.class.push("btn-default");
							break;	

						case "info":
							compiled_button_options.class.push("btn-success");
							break;

						case "blue":
							compiled_button_options.class.push("btn-success");
							break;

						case "error":
							compiled_button_options.class.push("btn-error");
							break;

						case "red":
							compiled_button_options.class.push("btn-error");
							break;

						default:
							compiled_button_options.class.push("btn-white");
							break;
					}
				}

				element_children.push(new E(compiled_button_options));
				button_count++;
			}
		}

		this.element = new E({
			type: "div",
			class: ["confirm-window-content"],
			children: element_children
		});
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
		let b = new E({
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
				new E({
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
				new E({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${backBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateY(180deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: backLabel.toString()
				}),
				//Top face
				new E({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${topBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateX(90deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: topLabel.toString()
				}),
				//Right face
				new E({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${rightBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateY(90deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: rightLabel.toString()
				}),
				//Bottom face
				new E({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${botBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateX(-90deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
					text: botLabel.toString()
				}),
				//Left face
				new E({
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
				new E({
					type: "h4",
					id: ["menu-title"],
					text: this.title
				})
			]
		};
		this.setParams(data);
		let menu = new E(this.menuParams);
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
						this.menuParams.children.push(new E(params));
					}
				}
			} else {
				console.warn("Expected object.");
			}
		} else {
			console.warn("Expected menu voices.");
		}
		
		//Add close menu btn
		this.menuParams.children.push(new E({
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

//Spinner object
class SpinnerRing {
	constructor(data = {
		generateContainer: false,
		message: "Please wait...",
		style: "classic",
		size: "normal"
	}) {
		this.container = null;
		this.result = null;
		this.spinnerParams = {
			type: "spinner-ring"
		};
		this.message = "";
		this.style = "classic";
		this.size = "normal";
		this.classes = [];
		this.setAttributes(data);

		if(isDeclared(data.generateContainer) && !data.generateContainer.isFunction() && data.generateContainer.bool()) {
			this.container = this.generateContainer();
			this.container.setAttribute("waiter", "waiter");
			this.container.appendChild(this.result);
			return this.container;
		} 
		return this.result;
	}
	generateContainer() {
		return new E({
			type: "spinner-container"
		});
	}
	setAttributes(data) {
		if(isDeclared(data.message) && !data.message.isFunction() && !data.message.empty()) {
			this.message = String(data.message);
		}
		if(isDeclared(data.style) && !data.style.isFunction() && !data.style.empty()) {
			switch(data.style.toString()) {
				case "coin":
					this.classes.push("gold");
					break;
				case "gold":
					this.classes.push("gold");
					break;
				case "inverse":
					this.classes.push("inverse");
					break;
				case "inverted":
					this.classes.push("inverse");
					break;
			}
		}
		if(isDeclared(data.size) && !data.size.isFunction() && !data.size.empty()) {
			switch(data.size.toString()) {
				case "small":
					this.classes.push("small");
					break;
				case "s":
					this.classes.push("small");
					break;
				case "medium":
					this.classes.push("medium");
					break;
				case "m":
					this.classes.push("medium");
					break;
			}
		}

		if(this.classes.length > 0) {
			this.spinnerParams.class = this.classes;
		}
		if(!this.message.empty()) {
			let text = this.message;
			this.result = new E({
				type: "p",
				text: text,
				children: [
					new E({
						type: "br"
					}),
					new E(this.spinnerParams)
				]
			});
		} else {
			let spinnerRing = new E(this.spinnerParams);
			this.result = spinnerRing;
		}
	}
}

const Elements = Element || Interface || Confirm || Script || Cube || Toast || TextSwitchbox || Menu || E;
const Objects = Object || Elements;

Objects.prototype.stretch = function(properties = "width, height", mode = "match_parent, match_parent") {
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
Objects.prototype.instance = function(instance) {
	return this instanceof instance ? true : false;
};
Objects.prototype.mousepos = function (e) {
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
Objects.prototype.getPadding = function (padding = "global") {
	let target = this;
	if(!isDeclared(padding) || padding.empty()) {
		padding = "global";
	}	
	switch(String(padding).toLowerCase()) {
		case (padding.match(/(\,)+/)): 
			let pads = padding.split(","), p = [];
			for (let x = 0; x < pads.length; x++) {
				p.push(pads[x].rmwhitesp(), parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-" + pads[x].rmwhitesp())));
			}
			return p;
		case (padding.rmwhitesp() == "global"):
			return {
				top: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-top")),
				right: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-right")),
				bottom: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-bottom")),
				left: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-left")),
			};
		case (["top", "right", "bottom", "left"].inArray(padding)):
			switch(padding) {
				case "top":
					return parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-top"));
				case "right":
					return parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-right"));
				case "bottom":
					return parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-bottom"));
				case "left":
					return parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-left"));
			}
		default:
			return {
				top: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-top")),
				right: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-right")),
				bottom: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-bottom")),
				left: parseFloat(win.getComputedStyle(target, null).getPropertyValue("padding-left")),
			};

	}
};
Objects.prototype.gravity = function (endpoint = "parent", planet = "earth") {
	let gravity = 0, target = this;
	this.held = false;
	if (planet.match(/earth/i)) {
		gravity = 9.81;
	}
	function doAttraction() {
		target.style.top = parseFloat(target.style.top) + gravity + "px";
	}
	setInterval(() => {
		if (target.held !== true) {
			if (endpoint.match(/parent/i)) {
				if (target.style.top == "") target.style.top = "0px";
				if ((parseFloat(target.style.top) + target.offsetHeight) < target.parentNode.offsetHeight - target.parentNode.getPadding("bottom")) {
					doAttraction();
					if ((parseFloat(target.style.top) + target.offsetHeight) > target.parentNode.offsetHeight - target.parentNode.getPadding("bottom")) target.style.top = target.parentNode.offsetHeight - target.parentNode.getPadding("bottom") - target.offsetHeight + "px";
				}
			}
		}
	}, 0);
};
Objects.prototype.isObject = function() {
	return this.instance(Objects);
};
Objects.prototype.attachTo = function(element) {
	if(element.isObject() || element.instance(Objects)) {
		let
			ot = element.getBoundingClientRect().top,
			ep = element.getPadding(),
			eh = element.offsetHeight,
			top = ot + ep.top + (eh/2);

		this.addStyles({
			"top": top + "px",
		});
	}
};
Objects.prototype.isHidden = function() {
	return this.hasAttribute("hidden") ? true : false;
};
Objects.prototype.hide = function() {
	if(!this.isHidden()) {
		this.setAttribute("hidden", "");
	}
};
Objects.prototype.show = function() {
	if(this.isHidden()) {
		this.removeAttribute("hidden");
	}
};
Objects.prototype.clearUp = function() {
	this.innerHTML = "";
};
Objects.prototype.rippleAnimation = function(e) {
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
Objects.prototype.txt = function(t) {
	if(isDeclared(t)) {
		this.innerHTML = t;
	}
	return this.innerText;
};
Objects.prototype.on = function(listener, fn) {
	listener = String(listener);
	if(!fn.isFunction()) {
		console.error("Parameter fn must be a function");
		return;
	}
	this.addEventListener(listener, fn);
};
