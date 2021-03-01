//Create new document element
class Element {
	constructor(data = {
		type: "",
		properties: [],
		text: "",
		value: "",
		src: "",
		href: "",
		placeholder: "",
		datasets: [],
		children: [],
		load: undefined,
		dbclick: undefined,
		click: undefined,
		cmenu: undefined,
		hover: undefined,
		hout: undefined,
		keydown: undefined
	}) {
		if(this.setParams(data)) {
			this.element = dom.createElement(this.type);
			return this.element;
		}
	}

	setParams(data) {
		/* HTML tag */
		data.type !== undefined && data.type !== null && data.type.length > 0 ?
			this.type = data.type:
			error("");
		/* Set properties */
		if(data.properties !== undefined && data.type !== null && typeof data.type == "object" && !data.type.isFunction()) {
			for(let property in data.properties) {
				switch(String(property)) {
					case "class":
						this.element.addClasses(data.properties[property]);
						break;
					case "style":
						this.element.addStyles(data.properties[property]);
						break;
				}
			}
		}
		/* Set attributes */
		//Text content
		if(data.text !== undefined && data.text !== null)
			this.element.innerHTML = String(data.text);
		//Value
		if(data.value !== undefined && data.value !== null)
			this.element.setAttribute("value", String(data.value));
		//Source
		data.src !== undefined && data.src !== null && data.src.length > 0 ?
			this.element.setAttribute("src", String(data.src)):
			error("");
		//Header reference
		if(data.href !== undefined && data.href !== null)
			this.element.setAttribute("href", String(data.href));
		//Placeholder
		if(data.placeholder !== undefined && data.placeholder !== null)
			this.element.setAttribute("placeholder", String(data.placeholder));
		//Value
		if(data.value !== undefined && data.value !== null)
			this.element.setAttribute("value", String(data.value));
		return true;
	}

	setDataset(dset) {

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
	constructor(options = {
		header: "Lorem ipsum",
		body: [],
		footer: []
	}) {
		if (Array.isArray(options.body) === false) {
			error("Body option must be an array.");
		} else {
			let body = options.body,
				footer = options.footer;
			if (Array.isArray(options.footer) === true && options.footer !== undefined && options.footer !== null) footer = options.footer;
			return new Element({
				type: "div",
				properties: [
					"id@interface",
					"class@fixed adapt-all pad-all-l",
					"style@background-color:rgba(0, 0, 0, 0.7);"
				],
				children: [
					//Header
					new Element({
						type: "div",
						properties: [
							"id@interface-header",
							"style@background-color:#0070aa;"
						],
						children: [
							new Element({
								type: "h3",
								properties: ["class@width-100 whiteColor pad-all-m"],
								text: options.header.toString(),
								children: [
									new Element({
										type: "div",
										properties: [
											"class@btn-custom pad-all-s whiteBgColor blackColor pointing-cursor",
											"style@float:right;"
										],
										text: "x",
										onClick: function () {
											_("#interface").parentNode.removeChild(_("#interface"));
										}
									})
								]
							})
						]
					}),
					//Body
					new Element({
						type: "div",
						properties: [
							"id@interface-body",
							"class@width-100 whiteBgColor pad-all-m no-border",
							"style@min-height:70vh;"
						],
						children: body
					}),
					//Footer
					new Element({
						type: "div",
						properties: [
							"id@interface-footer",
							"class@width-100 whiteBgColor pad-all-m no-border",
							"style@min-height:15vh;"
						],
						children: footer
					})
				]
			});
		}
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
		confirm: undefined,
		cancel: undefined,
		cancelText: "",
		confirmText: "",
		deleteOnConfirm: true,
		deleteOnCancel: true,
		title: ""
	}) {
		if (data.confirm.isFunction() === false && data.confirm !== null && data.confirm !== undefined) {
			error("Confirm parameter must be a function.");
		} else {
			if (data.cancel.isFunction() === false && data.cancel !== null && data.cancel !== undefined) {
				error("Cancel parameter must be a function.");
			} else {
				let confirmId = "#confirm_dialog_" + (_(".confirm-window-background").length + 1);
				return new Element({
					type: "div",
					properties: [
						"id@" + confirmId,
						"class@confirm-window-background",
					],
					children: [
						new Element({
							type: "div",
							properties: ["class@confirm-window-content"],
							children: [
								new Element({
									type: "h3",
									properties: ["class@confirm-window-title"],
									text: String(data.title)
								}),
								new Element({
									type: "span",
									properties: ["class@btn-custom btn-white"],
									text: String(data.cancelText),
									onClick: () => {
										if (data.cancel.isFunction()) data.cancel();
										if (data.deleteOnCancel === true)
											dom.getElementById(confirmId).parentNode.removeChild(dom.getElementById(confirmId));
										//End if
									}
								}),
								new Element({
									type: "span",
									properties: ["class@btn-custom btn-error"],
									text: String(data.confirmText),
									onClick: () => {
										if (data.confirm.isFunction()) data.confirm();
										if (data.deleteOnConfirm === true)
											dom.getElementById(confirmId).parentNode.removeChild(dom.getElementById(confirmId));
										//End if
									}
								})
							]
						})
					]
				});
			}
		}
	}
}
//Slider object
class Slider {
	constructor(data = {
		interval: 0,
		autoscroll: false,
		photos: [],
		shadow: false,
		dots: false
	}) {
		let ch = Array();
		let props = Array("class@slider-container");
		if (data.autoscroll === true && data.interval > 0) {
			props.push("slider-autoscroll@true");
			props.push(`scroll-interval@${data.interval}`);
		}
		let ph = Array();
		data.photos.forEach(p => {
			ph.push(new Element({
				type: "img",
				properties: [
					"class@slider-item",
					"src@" + p
				]
			}));
		});
		if (data.shadow === true) props.push("shadow@true");
		if (data.photos.length > 0) ch.push(new Element({
			type: "div",
			properties: ["class@slider-sections"],
			children: ph
		}));
		if (data.dots === true) ch.push(new Element({
			type: "div",
			properties: ["class@slider-dots"]
		}));
		return new Element({
			type: "div",
			properties: props,
			children: ch
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
			topBg = "background-color:#00000088;",
			rightBg = "background-color:#00000088;",
			botBg = "background-color:#00000088;",
			leftBg = "background-color:#00000088;",
			frontBg = "background-color:#00000088;",
			backBg = "background-color:#00000088;";
		if (data.colors !== undefined) {
			topBg = `background-color:#${data.colors.top};`;
			rightBg = `background-color:#${data.colors.right};`;
			botBg = `background-color:#${data.colors.bottom};`;
			leftBg = `background-color:#${data.colors.left};`;
			frontBg = `background-color:#${data.colors.front};`;
			backBg = `background-color:#${data.colors.back};`;
		}
		else if (data.useGlobalColor === true && data.globalColor.length.inRange(6, 8) === true) {
			topBg = `background-color:#${data.globalColor};`;
			rightBg = `background-color:#${data.globalColor};`;
			botBg = `background-color:#${data.globalColor};`;
			leftBg = `background-color:#${data.globalColor};`;
			frontBg = `background-color:#${data.globalColor};`;
			backBg = `background-color:#${data.globalColor};`;
		}
		let properties = [
			"class@cube",
			`style@display:inline-block;margin:40px;transition:all 1.5s;position:relative;transform-style:preserve-3d;width:${size}px;height:${size}px;user-select:none;`
		];
		if (data.randomRotate === true) properties.push(`autorotate@${data.rotationTimeout}`);
		let b = new Element({
			type: "div",
			properties: properties,
			children: [
				//Front face
				new Element({
					type: "div",
					properties: [
						"class@cube-face",
						`style@border-radius:${data.borderRadius}px;border:solid ${data.borderWidth}px #000;${frontBg}position:absolute;width:100%;height:100%;font-size:${(size / 2) - 10}px;font-weight:bold;color:#fff;text-align:center;transform:rotateY(0deg) translateZ(${size / 2}px);line-height:${size}px;`
					],
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
		this.data = data;
		this.setParams();
		let menu = new Element({
			type: "div",
			properties: [
				"id@contextmenu",
				"class@contextmenu"
			],
			children: this.voices
		});
		this.menu = menu;
		this.setMenuPos();
		return menu;
	}

	closeMenus() {
		document.querySelectorAll(".contextmenu").forEach(m => m.parentNode.removeChild(m));
	}

	setParams() {
		let temp = [];
		let voices = this.data.voices;
		if(voices !== null && voices !== undefined) {
			if(typeof voices == "object" && !voices.isFunction() && voices.length > 0) {
				voices.forEach(voice => {
					let params = {
						type: "a",
						properties: ["class@contextmenu-item"]
					};
					if(voice.label !== undefined && voice.label !== null) params.text = String(voice.label);
					if(voice.onClick !== undefined && voice.onClick !== null && voice.onClick.isFunction()) params.onClick = voice.onClick;
					temp.push(new Element(params));
				});
			} else warn("");
		} else warn("");
		this.voices = temp;
	}

	setMenuPos(e) {
		if (e === undefined) e = win.event;
		let top, left;
		left =  dom.mousepos().x+"px";
		top = dom.mousepos().y+"px";
		this.menu.addStiles({
			"top": top,
			"left": left
		});
	}
}