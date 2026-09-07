import {
	$, 
	isDeclared, 
	isFunction, 
	isDict
} from "../utilities.js";
import E from "./e.js";

export default class Contextmenu {
	title = "Menu";
	menuParams = {};

	constructor(data = {
		title: null,
		voices: {},
		closeOnClickOut: true,
		closeOnClickOver: true
	}) {
		this.closeMenus();

		if(isDeclared(data.title)) {
			this.title = String(data.title);
		}

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

		$(window).events(["scroll", "click"], (d) => {
			this.closeMenus();
		});

		return new E(this.menuParams);
	}

	closeMenus() {
		$(".contextmenu").each(m => {
			m?.remove();
		});
	}

	setParams(data) {
		let voices = data.voices;
		if(isDeclared(voices)) {
			if(isDict(voices) && !isFunction(voices)) {
				//Add menu voices
				for(let voice in voices) {
					let value = voices[voice];
					if(
						!isFunction(value) 
						&& isDict(value) 
						&& isDeclared(value.label)
					) {
						let params = {
							type: "a",
							class: ["contextmenu-item"],
							text: value.label
						};

						//Add action
						if(
							isDeclared(value.click) 
							&& isFunction(value.click)
						) {
							params.click = () => {
								value.click.call();
								this.closeMenus();
							};
						}

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
			text: "Cancel",
			click:() => {
				this.closeMenus();
			}
		}));
	}

	static setMenuPos(menu) {
	    let 
	    	mousePos = document.body.mousepos,
	    	x = mousePos.x,
	    	y = mousePos.y,
	    	top = y,
	    	left = x,
	        menuWidth = menu.offsetWidth,
	        menuHeight = menu.offsetHeight,
	        parentWidth = window.innerWidth,
	        parentHeight = window.innerHeight;

	    if((x + menuWidth) > parentWidth) {
	        left = x - menuWidth;
	    } 

	    if((y + menuHeight) > parentHeight) {
	        top = y - menuHeight;
	    }

	    menu.addStyles({
	        "top": top + "px",
	        "left": left + "px"
	    });
	}
}