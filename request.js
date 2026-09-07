import {isDeclared, isNull, isFunction, isDict} from "./utilities.js";

export default class Request {
	#methods = ["POST", "GET", "PUT", "DELETE"];
	#method = "POST";
	#url = "";
	#data = null;
	#done = null;
	#xhr = new XMLHttpRequest() 
		// Edge-Explorer compatibility;
		|| new ActiveXObject("Microsoft.XMLHTTP");

	constructor(params = {
		method: "",
		url: "",
		send_files: false,
		headers: {},
		data: {},
		done: function () {}
	}) {
		if(isDeclared(params.done) && isFunction(params.done)) {
			this.#done = params.done;
		}

		this.setParams(params);
		
		this.#xhr.open(this.#method, this.#url, true);

		if(!isDeclared(params.headers) || !isDict(params.headers)) {
			params.headers = {};
		}

		params.headers["Content-Type"] = "application/json";
		if(isDeclared(params.headers) && params.headers.length > 0) {
			for (let header in params.headers) {
				const value = params.headers[header];
				this.#xhr.setRequestHeader(header, value);
			}
		}

		this.setData(params.data);

		if(
			isDeclared(params.send_files) 
			&& params.send_files === true
		) {
			this.#xhr.overrideMimeType("multipart/form-data");
		}

		//Send data
		this.#xhr.send(this.data);
		this.#xhr.onload = () => {
			if(!isNull(this.#done)) {
				let result = [];
				result["code"] = this.#xhr.status;
				result["response"] = this.#xhr.statusText;
				result["return"] = this.#xhr.responseText;
				result["xmlReturn"] = this.#xhr.responseXML;
				result["success"] = this.#xhr.status === 200 
					|| this.#xhr.responseText.trim() === "ok";
				result["error"] = !result["success"];

				this.#done(result);
			}
		};

		return this;
	}

	setParams(data) {
		//Set method
		if (
			isDeclared(data.method) 
			&& this.#methods.includes(data.method.toUpperCase())
		) {
			this.#method = data.method.toUpperCase();
		} else {
			console.error("Method parameter is not supported. Try using one of these methods: post, get, put, delete.");
		}

		//Set url
		if (isDeclared(data.url) && data.url.toString().length > 0) {
			this.#url = data.url.toString();
		} else {
			console.error("Url parameter must have a length of at least 1 character.");
		}

		return this;
	}

	setData(data) {
		if(isDeclared(data) && isDict(data)) {
			const form = new FormData();

			for(let key in data) {
				let value = data[key];

				if(isDeclared(value) && !isFunction(value)) {
					//This one for file upload
					if(
						isDeclared(value.type) 
						&& value.type === "file"
					) {
						for(let f = 0; f < value.files.length;f++) {
							form.append(
								`${key}[]`, 
								value.files[f], 
								value.files[f].name
							);
						}
					} else {
						form.append(key, value);
					}
				}
			}

			this.data = form;
		}

		return this;
	}
}