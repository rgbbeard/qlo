/*
	JavaScript library
		Latest@17-12-2020
*/
class Element {
	constructor(data = {
		type: "",
		properties: [],
		text: "",
		value: "",
		src: "",
		placeholder: "",
		children: [],
		onLoad: undefined,
		dbClick: undefined,
		onClick: undefined,
		onRClick: undefined,
		mouseOver: undefined,
		mouseOut: undefined,
		fingerDown: undefined,
		fingerSwipe: undefined,
		fingerUp: undefined,
		keyDown: undefined
	}) {
		if (typeof data !== "object" && !Array.isArray(data)) {
			error("Element data must come into an array.");
		}
		else {
			let
				t = data.type,
				p = data.properties,
				txt = data.text,
				val = data.value,
				s = data.src,
				ph = data.placeholder,
				c = data.children,
				a = data.actions;
			if (t !== null && t !== undefined) {
				//Check if element type is defined
				t.length > 0 ?
					this.element = dom.createElement(t) :
					error("Element type must be defined");
			}
			if (p !== null && p !== undefined) {
				//Check if there are element properties
				p.length > 0 && typeof p == "object" && Array.isArray(p) ?
					p.forEach(property => {
						let name = property.split("@")[0];
						let value = property.split("@")[1];
						this.element.setAttribute(name, value);
					}) :
					error("Element properties must come into an array.");
			}
			if (txt !== null && txt !== undefined) {
				//Check if there is text content to set
				if (txt.length > 0) this.element.innerHTML = txt;
			}
			if (val !== null && val !== undefined) {
				//Check if there is a value to set
				if (val.length > 0) this.element.value = val;
			}
			if (s !== null && s !== undefined) {
				//Check if there is a src to set
				if (s.length > 0) this.element.src = s;
			}
			if (ph !== null && ph !== undefined) {
				//Check if there is a placehoder to set
				if (ph.length > 0) this.element.placeholder = ph;
			}
			if (c !== null && c !== undefined) {
				//Check if there are children to append
				c.length > 0 && typeof c === "object" && Array.isArray(c) ?
					c.forEach(child => this.element.appendChild(child)) :
					error("Element children must come into an array.");
			}
			if (data.onLoad !== undefined && data.onLoad !== null) {
				data.onLoad.isFunction() ?
					this.element.load(data.onLoad) :
					error("Expecting function at onLoad parameter.");
			}
			if (data.dbClick !== undefined && data.dbClick !== null) {
				data.dbClick.isFunction() ?
					this.element.dbclick(data.dbClick) :
					error("Expecting function at dbClick parameter.");
			}
			if (data.onClick !== undefined && data.onClick !== null) {
				data.onClick.isFunction() ?
					this.element.lclick(data.onClick) :
					error("Expecting function at onClick parameter.");
			}
			if (data.onRClick !== undefined && data.onRClick !== null) {
				data.onRClick.isFunction() ?
					this.element.rclick(data.onRClick) :
					error("Expecting function at onRClick parameter.");
			}
			if (data.mouseOver !== undefined && data.mouseOver !== null) {
				data.mouseOver.isFunction() ?
					this.element.hover(data.mouseOver) :
					error("Expecting function at mouseOver parameter.");
			}
			if (data.mouseOut !== undefined && data.mouseOut !== null) {
				data.mouseOut.isFunction() ?
					this.element.hout(data.mouseOut) :
					error("Expecting function at mouseOut parameter.");
			}
			if (data.fingerDown !== undefined && data.fingerDown !== null) {
				data.fingerDown.isFunction() ?
					this.element.tap(data.fingerDown) :
					error("Expecting function at fingerDown parameter.");
			}
			if (data.fingerSwipe !== undefined && data.fingerSwipe !== null) {
				data.fingerSwipe.isFunction() ?
					this.element.swipe(data.fingerSwipe) :
					error("Expecting function at fingerSwipe parameter.");
			}
			if (data.fingerUp !== undefined && data.fingerUp !== null) {
				data.fingerUp.isFunction() ?
					this.element.release(data.fingerUp) :
					error("Expecting function at fingerUp parameter.");
			}
			if (data.keyDown !== undefined && data.keyDown !== null) {
				data.keyDown.isFunction() ?
					this.element.keydown(data.keyDown) :
					error("Expecting function at keyDown parameter.");
			}
			return this.element;
		}
	}
}
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
class Toast {
	constructor(data = {
		text: "",
		position: "",
		timeout: 0
	}) {
		this.toastCentered = "";
		this.timeout = data.timeout > 0 ?
			data.timeout :
			5;
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
class Switchbox {
	constructor(data = {
		description: "",
		info: "",
		id: "",
		classes: []
	}) {

	}
}
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
			"tsb-" + __(".text-switchbox").length :
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
			btn.lclick(() => {
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
				let confirmId = "#confirm-dialog-" + (__(".confirm-dialog").length + 1);
				return new Element({
					type: "div",
					properties: [
						"id@" + confirmId,
						"class@fixed adapt-all confirm-dialog",
						"style@background-color:rgba(0, 0, 0, 0.5);"
					],
					children: [
						new Element({
							type: "div",
							properties: [
								"class@absolute width-50 adapt-width margin-auto text-centered",
								`style@background-color:#fff;padding:var(--default-padding-1);display:block !Important;
								top:${(wh / 2)}px;`
							],
							children: [
								new Element({
									type: "h2",
									properties: [
										"class@bot-margin-m"
									],
									text: data.title.toString()
								}),
								new Element({
									type: "span",
									properties: [
										"class@btn-custom whiteColor margin-all-s",
										"style@background-color:var(--cms-blue-2);padding:var(--default-padding-1);"
									],
									text: data.cancelText,
									onClick: function () {
										if (data.cancel.isFunction()) data.cancel.call();
										if (data.deleteOnCancel === true) _(confirmId).parentNode.removeChild(confirmId);
									}
								}),
								new Element({
									type: "span",
									properties: [
										"class@btn-custom whiteColor margin-all-s",
										"style@background-color:var(--red-alert);padding:var(--default-padding-1);"
									],
									text: data.confirmText,
									onClick: () => {
										if (data.confirm.isFunction()) data.confirm.call();
										if (data.deleteOnConfirm === true) _(confirmId).parentNode.removeChild(confirmId);
									}
								}),
								//Separator
								new Element({
									type: "div",
									properties: ["style@min-height:10px;"]
								})
							]
						})
					]
				});
			}
		}
	}
}
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