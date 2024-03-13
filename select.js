
window.addEventListener("load", function() {
	const selectors = function() {
		Array.from(document.getElementsByClassName("select-input")).forEach(container => {
			const rendered = container.getAttribute("rendered");
			if(rendered == null || rendered == undefined) {

				container.setAttribute("rendered", "true");

				const 
					label = container.getElementsByTagName("label")[0],
					select = container.getElementsByTagName("select")[0],
					options = select.getElementsByTagName("option"),
					select_id = label.getAttribute("for");

				const 
					s = document.createElement("ul"), 
					d = document.createElement("p");

				Array.from(options).forEach((option, index) => {
					const o = document.createElement("li");

					o.dataset.value = option.value;
					o.textContent = option.textContent;
					s.appendChild(o);
				});

				container.appendChild(d);
				container.appendChild(s);


				d.textContent = s.children[0]?.textContent;
				select.value = s.children[0]?.dataset.value.trim();
				s.style.left = `${d.offsetLeft}px`;

				d.addEventListener("click", function() {
					if(this.getAttribute("open") != undefined 
						&& this.getAttribute("open") != null) {
						s.removeAttribute("visible");
						this.removeAttribute("open");
					} else {
						s.setAttribute("visible", true);
						this.setAttribute("open", true);
					}
				});

				Array.from(select.children).forEach(c => {
					if(c.hasAttribute("selected")) {
						d.textContent = c.textContent;		
						select.value = c.value.trim();
					}
				});

				Array.from(s.children).forEach(c => {
					c.addEventListener("click", function(e) {
						if(e.target === c) {
							d.textContent = c.textContent;
							d.removeAttribute("open");
							s.removeAttribute("visible");
							select.value = c.dataset.value.trim();
						}
					});
				});
			}
		});
	};
	
	selectors();
	setInterval(selectors, 1000);
});
