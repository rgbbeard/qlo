class NavMobile extends HTMLElement {
	#open = false;
	#menu = null;
	#burger = null;
	#close_button = null;

	constructor() {
		super();

		this.#menu = this.querySelector(".menu");
		this.#burger = this.querySelector(".burger-container");
		this.#close_button = this.querySelector("span.close-menu-button");

		this.#init_resize();
		this.#init_burger();
		this.#close_menu();

		window.addEventListener("resize", () => {
			this.#init_resize();
		});
	}

	#init_resize() {
		this.style.display = window.innerWidth < 1025 ? 
			"inline-block" : 
			"none";
	}

	#init_burger() {
		this.#burger.addEventListener("click", () => {
			if(!this.#open) {
				this.#menu.style.display = "block";
				this.#open = true;
			}
		});
	}

	#close_menu() {
		this.#close_button.addEventListener("click", () => {
			if(this.#open) {
				this.#menu.style.display = "none";
				this.#open = false;
			}
		});
	}
}

customElements.define("nav-mobile", NavMobile);