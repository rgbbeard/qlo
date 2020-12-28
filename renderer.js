/*
    JavaScript library
		Latest@17-12-2020
*/
/*
    CHANGE SLIDER SECTION
*/
function slideTo($ = {}) {
    $.sections.forEach(s => {
        s.style.display = "none";
    });
    $.sections[$.position].style.display = "inline-block";
}
/*
    AUTOMATE SLIDING ACTION
*/
function initSlider(s, sections, interval) {
    let x = 0;
    print(s, sections, interval);
    setInterval(() => {
        if (x >= (sections.length - 1)) {
            x = -1;
        }
        x++;
        slideTo({
            sections: sections,
            position: x
        });
        print(x);
    }, (interval * 1000));
}

function elementsRenderer() {
    var debugActive = false;
    /*
        FLEX ROWS
    */
    _(".flex-row").forEach(f => {
        f.querySelectorAll(".col").forEach(c => {
            c.width = f.offsetWidth / c.length + "px";
        });
    });
    /* 
        COMPOSED PARAGRAPH
    */
    _("#content [itemtype='composed-paragraph']").forEach(e => {
        this.globalText = e.getAttribute("globaltext").bool();
        this.globalClass = e.getAttribute("globalclass").bool();
        this.childrenContent =
            this.globalText === true ?
            e.getAttribute("childrencontent") :
            e.getAttribute("childrencontent").split("[PC]");
        this.childrenNum = parseInt(e.getAttribute("childrennum"));
        for (let x = 0; x < this.childrenNum; x++) {
            e.appendChild(new Element({
                type: "p",
                text: Array.isArray(this.childrenContent) === true ?
                    this.childrenContent[x] : this.childrenContent
            }));
        }
        e.removeAttributes("childrennum", "childrencontent", "itemtype", "globaltext");
        e.addClass("composed-paragraph");
    });
    /*
        DEBUG BUTTON
    */
    _("[debug-btn]").forEach(d => {
        d.lclick(function () {
            if (debugActive === true) {
                _("*").forEach(a => {
                    a.style.outline = "initial";
                });
                debugActive = false;
            } else {
                _("*").forEach(a => {
                    a.style.outline = "solid 1px var(--green)";
                });
                debugActive = true;
            }
        });
    });
    /*
        TEXT SWITCHBOX
    */
    _(".text-switchbox").forEach(t => {
        let
            btn = t.querySelector("[switch-button]"),
            input = t.querySelector("input");
        let
            bgcOn = "var(--green)",
            bgcOff = "var(--light-red)",
            colorOn = "#fff",
            colorOff = "#fff",
            textOn = "On",
            textOff = "Off",
            valueOn = 1,
            valueOff = 0;
        if (btn.getAttribute("bgc-on") !== null) bgcOn = btn.getAttribute("bgc-on");
        if (btn.getAttribute("bgc-off") !== null) bgcOff = btn.getAttribute("bgc-off");
        if (btn.getAttribute("color-on") !== null) colorOn = btn.getAttribute("color-on");
        if (btn.getAttribute("color-off") !== null) colorOff = btn.getAttribute("color-off");
        if (btn.getAttribute("text-on") !== null) textOn = btn.getAttribute("text-on");
        if (btn.getAttribute("text-off") !== null) textOff = btn.getAttribute("text-off");
        if (btn.getAttribute("value-on") !== null) valueOn = btn.getAttribute("value-on");
        if (btn.getAttribute("value-off") !== null) valueOff = btn.getAttribute("value-off");
        /* Check if button is checked */
        if (btn.getAttribute("button-checked") === null || btn.getAttribute("button-checked").bool() === false || btn.getAttribute("button-checked").empty()) {
            btn.addStyles({
                "background-color": bgcOff,
                "color": colorOff
            });
            input.setAttribute("value", valueOff);
            btn.textContent = textOff;
            this.on = false;
        } else if (btn.getAttribute("button-checked") !== null || btn.getAttribute("button-checked").bool() === true || btn.getAttribute("button-checked").empty() === false) {
            btn.addStyles({
                "background-color": bgcOn,
                "color": colorOn
            });
            input.setAttribute("value", valueOn);
            btn.textContent = textOn;
            this.on = true;
        }
        btn.lclick(() => {
            if (t.hasAttribute("disabled") === false && btn.hasAttribute("disabled") === false) {
                if (this.on === false) {
                    btn.addStyles({
                        "background-color": bgcOn,
                        "color": colorOn
                    });
                    btn.textContent = textOn;
                    btn.setAttribute("button-checked", "true");
                    input.setAttribute("value", valueOn);
                    this.on = true;
                } else {
                    btn.addStyles({
                        "background-color": bgcOff,
                        "color": colorOff
                    });
                    btn.textContent = textOff;
                    btn.removeAttribute("button-checked");
                    input.setAttribute("value", valueOff);
                    this.on = false;

                }
            }
        });
        btn.removeAttributes("bgc-off", "bgc-on", "color-on", "color-off", "text-on", "text-off", "value-on", "value-off");
    });
    /*
        COLLAPSABLE MENUS
    */
    _("[collapsable]").forEach(c => {
        let trigger = c.getAttribute("collapse-btn");
        if(c.getAttribute("collapsed").bool()) c.style.display = "none";
        _("#" + trigger).lclick(function () {
            let icon = this.querySelector(".dropdown-icon");
            c.style.display === "none" ?
                c.style.display = "inline" :
                c.style.display = "none";
            if (icon !== null) {
                icon.hasClass("dropdown-collapsed") ?
                    icon.toggleClasses("dropdown-collapsed", "dropdown-opened") :
                    icon.toggleClasses("dropdown-opened", "dropdown-collapsed");
            }
        });
    });
    /*
        BETA NOT TESTED - AUTO POSITION ELEMENT
    */
    _("[auto-position]").forEach(a => {
        a.lpos((ww - a.offsetWidth) / 2 + "px");
    });
    /*
        SLIDERS
    */
    _(".slider-container").forEach((s) => {
        let sections = s.querySelectorAll(".slider-sections .slider-item");
        let dotsContainer = s.querySelector(".slider-dots");
        for (let y = 0; y < sections.length; y++) {
            dotsContainer.appendChild(new Element({
                type: "div",
                properties: [
                    "class@slider-dot"
                ]
            }));
        }
        let dots = s.querySelectorAll(".slider-dots .slider-dot");
        dots[0].addClass("current");
        if (s.hasAttribute("slider-autoscroll")) {
            //Show the first section
            slideTo({
                sections: sections,
                position: 0
            });
            s.load(initSlider(s, sections, parseInt(s.getAttribute("scroll-interval"))));
        }
        //Add dots functionality
        if (dots.length > 0) {
            dots.forEach((d) => {
                d.lclick(() => {
                    let i = dots.elementIndex(d);
                    slideTo({
                        sections: sections,
                        position: i
                    });
                    dots.forEach(d => d.removeClass("current"));
                    d.addClass("current");
                });
            });
        }
    });
    /*
        CUBES AUTOROTATION
    */
    _(".cube[autorotate]").forEach(c => {
        var x = 0, y = 0, z = 0, deg = 0, interval = c.getAttribute("autorotate");
        let rotation = setInterval(() => {
            x = Math.random() * 360;
            y = Math.random() * 360;
            z = Math.random() * 360;
            deg = Math.random() * 360;
            c.style.transform = `rotate3d(${x}, ${y}, ${z}, ${deg}deg)`;
            console.log(c);
        }, parseInt(interval) * 1000);

        c.onmouseover = ()=> {
            clearInterval(rotation);
        };
    });
}
win.onload = elementsRenderer();