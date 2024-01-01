class Contextmenu {
	title = "Menu";
	menuParams = {};

	constructor(data = {
		title: null,
		voices: {},
		closeOnClickOut: true,
		closeOnClickOver: true
	}) {
		this.closeMenus();
		if(isDeclared(data.title) && String(data.title)) {
			this.title = data.title;
		}
		this.menuParams = {
			type: "div",
			id: ["contextmenu"],
			class: ["contextmenu"],
			children: [
				element({
					type: "h4",
					id: ["menu-title"],
					text: this.title
				})
			]
		};
		this.setParams(data);
		let menu = element(this.menuParams);
		this.setMenuPos(menu);
		return menu;
	}

	closeMenus() {
		$(".contextmenu").each(m => {
			m.remove();
		});
	}

	setParams(data) {
		let voices = data.voices;
		if (isDeclared(voices)) {
			if (typeof voices == "object" && !voices.isFunction()) {
				//Add menu voices
				for (let voice in voices) {
					let value = voices[voice];
					if (!value.isFunction() && typeof value == "object" && isDeclared(value.label)) {
						let params = {
							type: "a",
							class: ["contextmenu-item"],
							text: value.label
						};
						//Add action
						if (isDeclared(value.click) && value.click.isFunction()) params.click = () => {
							value.click.call();
							this.closeMenus();
						};
						this.menuParams.children.push(element(params));
					}
				}
			} else {
				console.warn("Expected object.");
			}
		} else {
			console.warn("Expected menu voices.");
		}

		//Add close menu btn
		this.menuParams.children.push(element({
			type: "a",
			class: ["contextmenu-item"],
			text: "Annulla",
			click: () => {
				this.closeMenus();
			}
		}));
	}

	setMenuPos(menu, e) {
		if (isUndefined(e)) e = win.event;
		let top = document.body.mousepos().y + "px",
			left = document.body.mousepos().x + "px";
		menu.addStyles({
			"top": top,
			"left": left
		});
	}
}