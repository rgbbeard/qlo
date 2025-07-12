import { 
    isNull, 
    isUndefined, 
    isDeclared, 
    isFunction, 
    isDict, 
    isArray
} from "../utilities.js";
import * as prototypes from "../prototypes.js";

export default class SVG {
    constructor(data = {
        type: "",
        id: [],
        class: [],
        style: {},
        name: [],
        text: "",
        value: "",
        src: "",
        href: "",
        attributes: {},
        children: []
    }) {
        if(!isDict(data) || data.isEmpty()) {
            console.error("Missing parameters");
            return;
        }

        this.type = isDeclared(data.type) && data.type.length > 0 ? data.type : "svg";


        this.element = document.createElementNS("http://www.w3.org/2000/svg", this.type);

        this.setParams(data);
        this.addChildren(data.children);
        return this.element;
    }

    setParams(data) {
        /* Set properties */
        //IDs
        if(isDeclared(data.id) && isArray(data.id) && data.id.isEmpty()) {
            data.id.forEach(i => this.element.addId(i));
        }
        //Classes
        if(isDeclared(data.class) && isArray(data.class) && !data.class.isEmpty()) {
            data.class.forEach(c => this.element.addClass(c));
        }
        //Inline styles
        if(isDeclared(data.style) && isDict(data.style) && !data.style.isEmpty()) {
            this.element.addStyles(data.style);
        }

        /* Set attributes */
        //Text content
        if(isDeclared(data.text)) {
            this.element.innerHTML = data.text;
        }
    }

    addChildren(children) {
        if(isDeclared(children) && isArray(children)) {
            children.forEach(child => {
                if(typeof child === "object") {
                    this.element.appendChild(child);
                }
            });
        }
    }
}