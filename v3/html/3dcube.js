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
		} else if (data.useGlobalColor === true && data.globalColor.length.inRange(6, 8) === true) {
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
					class: ["cube-face"],
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