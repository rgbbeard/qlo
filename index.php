<!doctype html>
<html>
	<head>
		<title>Albums</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<link href="style.css" rel="stylesheet">
		<link href="album_slider.css" rel="stylesheet">
		<style>
		</style>
	</head>
	<body>
		<div class="container-fluid">
			<div class="row">
				<div class="albums">
					<div id="prev-album">&larr;</div>
					<div id="next-album">&rarr;</div>
					<div class="album width20 inline-block" data-slider="francesco_paola" style="display:block;">
						<img src="album/copertina.jpg" alt="Immagine non disponibile">
						<h3>Matrimonio a Trani 1</h3>
						<a class="btn-custom album-slider-btn">Vedi l'album 1</a>
					</div>
					<div class="album width20 inline-block" data-slider="francesco_paola" style="display:block;">
						<img src="album/copertina.jpg" alt="Immagine non disponibile">
						<h3>Matrimonio a Trani 2</h3>
						<a class="btn-custom album-slider-btn">Vedi l'album 1</a>
					</div>
					<div class="album width20 inline-block" data-slider="francesco_paola" style="display:block;">
						<img src="album/copertina.jpg" alt="Immagine non disponibile">
						<h3>Matrimonio a Trani 3</h3>
						<a class="btn-custom album-slider-btn">Vedi l'album 1</a>
					</div>
					<div class="album width20 inline-block" data-slider="francesco_paola" style="display:block;">
						<img src="album/copertina.jpg" alt="Immagine non disponibile">
						<h3>Matrimonio a Trani 4</h3>
						<a class="btn-custom album-slider-btn">Vedi l'album 1</a>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
<script src="utils.js"></script>
<script>
	onPageLoaded(function() {
		//Album slider
		var step = 1, step2 = 1;
		var albums = {
			"francesco_paola": [
				"album/1.JPG", "album/2.JPG", "album/3.JPG", "album/4.JPG", "album/5.JPG", "album/6.JPG", "album/7.JPG", "album/8.JPG", "album/9.JPG", "album/10.JPG", "album/11.JPG", "album/12.JPG"
			],
			"katia_mirko": [
				"img/album/katia_mirko/1.JPG", "img/album/katia_mirko/2.JPG", "img/album/katia_mirko/3.JPG", "img/album/katia_mirko/4.JPG", "img/album/katia_mirko/5.JPG", "img/album/katia_mirko/6.JPG", "img/album/katia_mirko/7.JPG", "img/album/katia_mirko/8.JPG", "img/album/katia_mirko/9.JPG", "img/album/katia_mirko/10.JPG", "img/album/katia_mirko/11.JPG", "img/album/katia_mirko/12.JPG", "img/album/katia_mirko/13.JPG", "img/album/katia_mirko/14.JPG", "img/album/katia_mirko/15.JPG", "img/album/katia_mirko/16.JPG", "img/album/katia_mirko/17.JPG", "img/album/katia_mirko/18.JPG", "img/album/katia_mirko/19.JPG", "img/album/katia_mirko/20.JPG", "img/album/katia_mirko/21.JPG", "img/album/katia_mirko/22.JPG", "img/album/katia_mirko/23.JPG", "img/album/katia_mirko/24.JPG", "img/album/katia_mirko/25.JPG", "img/album/katia_mirko/26.JPG", "img/album/katia_mirko/27.JPG"
			],
			"luciana_michele": [
				"img/album/luciana_michele/1.JPG", "img/album/luciana_michele/2.JPG", "img/album/luciana_michele/3.JPG", "img/album/luciana_michele/4.JPG", "img/album/luciana_michele/5.JPG", "img/album/luciana_michele/6.JPG", "img/album/luciana_michele/7.JPG", "img/album/luciana_michele/8.JPG", "img/album/luciana_michele/9.JPG", "img/album/luciana_michele/10.JPG", "img/album/luciana_michele/11.JPG", "img/album/luciana_michele/12.JPG", "img/album/luciana_michele/13.JPG", "img/album/luciana_michele/14.JPG", "img/album/luciana_michele/15.JPG", "img/album/luciana_michele/16.JPG", "img/album/luciana_michele/17.JPG", "img/album/luciana_michele/18.JPG", "img/album/luciana_michele/19.JPG", "img/album/luciana_michele/20.JPG", "img/album/luciana_michele/21.JPG", "img/album/luciana_michele/22.JPG", "img/album/luciana_michele/23.JPG", "img/album/luciana_michele/24.JPG"
			],
			"ruggiero_luisa": [
				"album/1.JPG", "img/album/ruggiero_luisa/2.JPG", "img/album/ruggiero_luisa/3.JPG", "img/album/ruggiero_luisa/4.JPG", "img/album/ruggiero_luisa/5.JPG", "img/album/ruggiero_luisa/6.JPG", "img/album/ruggiero_luisa/7.JPG", "img/album/ruggiero_luisa/8.JPG", "img/album/ruggiero_luisa/9.JPG", "img/album/ruggiero_luisa/10.JPG", "img/album/ruggiero_luisa/11.JPG", "img/album/ruggiero_luisa/12.JPG", "img/album/ruggiero_luisa/13.JPG", "img/album/ruggiero_luisa/14.JPG"
			],
			"domenicomaria_gina": [
				"img/album/domenicomaria_gina/1.JPG", "img/album/domenicomaria_gina/2.JPG", "img/album/domenicomaria_gina/3.JPG", "img/album/domenicomaria_gina/4.JPG", "img/album/domenicomaria_gina/5.JPG", "img/album/domenicomaria_gina/6.JPG", "img/album/domenicomaria_gina/7.JPG", "img/album/domenicomaria_gina/8.JPG", "img/album/domenicomaria_gina/9.JPG", "img/album/domenicomaria_gina/10.JPG", "img/album/domenicomaria_gina/11.JPG", "img/album/domenicomaria_gina/12.JPG", "img/album/domenicomaria_gina/13.JPG", "img/album/domenicomaria_gina/14.JPG"
			],
			"salvatore_cristina": [
				"img/album/salvatore_cristina/1.JPG", "img/album/salvatore_cristina/2.JPG", "img/album/salvatore_cristina/3.JPG", "img/album/salvatore_cristina/4.JPG", "img/album/salvatore_cristina/5.JPG", "img/album/salvatore_cristina/6.JPG", "img/album/salvatore_cristina/7.JPG", "img/album/salvatore_cristina/8.JPG", "img/album/salvatore_cristina/9.JPG", "img/album/salvatore_cristina/10.JPG", "img/album/salvatore_cristina/11.JPG", "img/album/salvatore_cristina/12.JPG", "img/album/salvatore_cristina/13.JPG", "img/album/salvatore_cristina/14.JPG", "img/album/salvatore_cristina/15.JPG", "img/album/salvatore_cristina/16.JPG", "img/album/salvatore_cristina/17.JPG", "img/album/salvatore_cristina/18.JPG", "img/album/salvatore_cristina/19.JPG", "img/album/salvatore_cristina/20.JPG", "img/album/salvatore_cristina/21.JPG", "img/album/salvatore_cristina/22.JPG"
			]
		};
		function getPhotos(albumName) {
			var photos = albums[albumName];
			var result = [];
			photos.forEach(p=> {
				result.push(new Element({
					type: "img",
					properties: [
						`style@max-height:${wh}px;width:auto;`,
						"src@"+p
					]
				}));
			});
			return result;
		}
		albumsSlider(0, "next");
		var autoSlide = setInterval(()=>{
			albumsSlider(step2++, "next");
		}, 5000);
		autoSlide;
		onPageResized(function() {
			dom.querySelectorAll(".images-container img").forEach(p=>{
				p.style.height = dom.body.clientHeight+"px";
				p.style.maxHeight = dom.body.clientHeight+"px";
			});
		});
		dom.querySelector("#next-album").lclick(()=> {
			clearInterval(autoSlide);
			albumsSlider(step2++, "next");
		});
		dom.querySelector("#prev-album").lclick(()=> {
			clearInterval(autoSlide);
			albumsSlider(step2--, "prev");
		});
		var btns = dom.querySelectorAll(".albums .album .album-slider-btn");
		btns.forEach(btn=>{
			btn.lclick(function() {
				var slider = new Element({
					type: "div",
					properties: [
						"id@album-slider",
						"class@album-slider"
					 ],
					children: [
						new Element({
							type: "div",
							properties: [
								"id@prev",
								"class@slider-button"
							],
							text: "&larr;"
						}),
						new Element({
							type: "div",
							properties: ["class@images-container"],
							children: getPhotos(this.parentNode.dataset.slider)
						}),
						new Element({
							type: "div",
							properties: [
								"id@next",
								"class@slider-button"
							],
							text: "&rarr;"
						})
					]
				});
				dom.body.appendChildren(
					new Element({
						type: "div",
						properties: [
							"id@slider-background",
							"style@position:fixed;top:0px;left:0px;right:0px;bottom:0px;background-color:rgba(0, 0, 0, 0.8);filter:blur(10px);"
						]
					}),
					slider
				);
				dom.querySelector(".slider-button#next").onclick = function() {
					photosSlider(step++, "next");
				};
				dom.querySelector(".slider-button#prev").onclick = function() {
					photosSlider(step--, "prev");
				};
				dom.querySelector("#slider-background").onclick = function() {
					step = 1;
					step2 = 1;
					dom.body.removeChildren(this, dom.querySelector("#album-slider"));
				};
			});
		});
		function albumsSlider(z, direction) {
			if(direction === undefined || direction === "" || direction === " ") {
				console.log("Slider direction is undefined");
			}
			else {
				let albums = dom.querySelectorAll(".albums .album");
				if(direction === "next" && z >= albums.length-1) {
					dom.querySelector("#next-album").style.display = "none";
					step2 = albums.length-1;
				}
				else {
					dom.querySelector("#next-album").style.display = "block";
				}
				if(direction === "prev" && z <= 0) {
					dom.querySelector("#prev-album").style.display = "none";
					step2 = 1;
				}
				else {
					dom.querySelector("#prev-album").style.display = "block";
				}
				albums.forEach(a=>{a.style.display = "none";});
				albums[z].style.display = "block";
			}
		}
		function photosSlider(z, direction) {
			if(direction === undefined || direction === "" || direction === " ") {
				console.log("Slider direction is undefined");
			}
			else {
				let photos = dom.querySelectorAll(".album-slider .images-container img");
				if(direction === "next" && z >= photos.length-1) {
					dom.querySelector(".slider-button#next").style.display = "none";
				}
				else {
					dom.querySelector(".slider-button#next").style.display = "block";
				}
				if(direction === "prev" && z <= 0) {
					dom.querySelector(".slider-button#prev").style.display = "none";
				}
				else {
					dom.querySelector(".slider-button#prev").style.display = "block";
				}
				photos.forEach(p=>{p.style.display = "none";});
				photos[z].style.display = "block";
			}
		}
	});
</script>
