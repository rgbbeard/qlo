import "./prototypes.js";
import {
    isFunction, 
    isDeclared, 
    isArray, 
    isUndefined,
    isNull
} from "./utilities.js";

export default class Cookie {
    name = "";
    value = "";
    expiration = "";

    constructor(name, value, expiration) {
        this.name = isDeclared(name) ? name : "tmpname";
        this.value = isDeclared(value) ? value : "";
        this.expiration = isDeclared(expiration) ? expiration : "";
    }

    static get(name) {
        if(!isDeclared(name)) {
            return new Cookie();
        }

        const nameEQ = encodeURIComponent(name) + "=";
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if(cookie.indexOf(nameEQ) === 0) {
                const value = decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
                return new Cookie(name, value, "");
            }
        }

        return new Cookie(name, "", "");
    }

    setName(name) {
        if(isDeclared(name)) {
            this.name = name;
        }
        return this;
    }

    setValue(value) {
        if(isDeclared(value)) {
            this.value = value;
        }
        return this;
    }

    setExpiration(expiration) {
        if(isDeclared(expiration)) {
            this.expiration = expiration;
        }
        return this;
    }

    store() {
        if(!this.name) {
        	return this;
        }

        let cookieString = `${encodeURIComponent(this.name)}=${encodeURIComponent(this.value)}`;

        if(this.expiration) {
            let expiresDate = "";

            if(this.expiration instanceof Date) {
                expiresDate = this.expiration.toUTCString();
            } else if(typeof this.expiration === "number") {
                const date = new Date();

                date.setTime(date.getTime() + (this.expiration * 1000));
                expiresDate = date.toUTCString();
            } else {
                expiresDate = this.expiration;
            }

            cookieString += `; expires=${expiresDate}`;
        }

        cookieString += `; path=/`;

        document.cookie = cookieString;
        return this;
    }

    delete() {
        if(!this.name) {
        	return this;
        }

        document.cookie = `${encodeURIComponent(this.name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        return this;
    }
}