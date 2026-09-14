import {isDeclared, isFunction} from "../utilities.js";
import E from "./e.js";

export default class SpinnerRing {
	constructor(data = {
		generateContainer: false,
		message: "Please wait...",
		style: "classic",
		size: "normal"
	}) {
		this.container = null;
		this.spinner = null;
		this.spinnerParams = {
			type: "spinner-ring"
		};
		this.message = "";
		this.style = "classic";
		this.size = "normal";
		this.classes = [];
		this.setAttributes(data);

		if(
			isDeclared(data.generateContainer) 
			&& !isFunction(data.generateContainer) 
			&& data.generateContainer.toBool()
		) {
			this.container = this.#generateContainer();
			this.container.appendChild(this.spinner);
		}

		return this;
	}

	#generateContainer() {
		return new E({
			type: "spinner-container"
		});
	}

	setAttributes(data) {
		if(
			isDeclared(data.message) 
			&& !isFunction(data.message) 
			&& !data.message.isEmpty()
		) {
			this.message = String(data.message);
		}

		if(
			isDeclared(data.style) 
			&& !isFunction(data.style) 
			&& !data.style.isEmpty()
		) {
			switch(data.style.toString()) {
				case "inverse":
					this.classes.push("inverse");
					break;
				case "inverted":
					this.classes.push("inverse");
					break;
				default:
					this.classes.push(data.style);
					break;
			}
		}

		if(
			isDeclared(data.size) 
			&& !isFunction(data.size) 
			&& !data.size.isEmpty()
		) {
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

		if(!this.message.isEmpty()) {
			let text = this.message;
			
			this.spinner = new E({
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
			this.spinner = new E(this.spinnerParams);
		}
	}

	setMessage(message) {
		this.render().querySelector("p")?.remove();
		this.render().appendChild(new E({
			type: "p",
			text: message
		}));
		return this;
	}

	render() {
        return this.container || this.result;
    }

    hide() {
    	this.render().hide();
    }

    show() {
    	this.render().show();
    }
}