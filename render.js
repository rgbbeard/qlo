const setMapping = function(t, a) {
        Object.defineProperty(t, a, {
                value: true,
                writable: false
        });

        // eval("console.log('"+a+":' + t." +a+")"); // Debug
};

const elementsRender = function() {
        //Validate addresses
        _('[validateaddress]').forEach(input => {
                if(!isDeclared(input?.validateaddress)) {
                        setMapping(input, "validateaddress");

                        input.on("keyup", function() {
                                //Remove commas
                                if(this.value.match(/\,+/i)) {
                                        this.value = this.value.replaceAll(",", "");
                                }
                        });
                }
        });
    
        //Validate email
        _('[validatemail]').forEach(input => {
                if(!isDeclared(input?.validatemail)) {
                       setMapping(input, "validatemail");

                        function VerifyValue(ipt) {
                                let form = findElement({tag: "form"}, ipt, (form) => {
                                        let btn = form.querySelector('[formsubmitter]');

                                        if(ipt.value.match(/([a\.\--z\_]*[a0-z9]+@)([a-z]+\.)([a-z]{2,6})/i)) {
                                                if(btn.isDisabled()) {
                                                        btn.removeAttribute("disabled");
                                                }
                                        } else {
                                                btn.setAttribute("disabled", "true");
                                        }
                                });
                        }

                        VerifyValue(input);

                        input.onkeyup = VerifyValue(input);
                }
        });

        //Validate italian fiscal code
         _('[validateitfcode]').forEach(input => {
                if(!isDeclared(input?.validateitfcode)) {
                        setMapping(input, "validateitfcode");

                        function VerifyValue(ipt) {
                                let form = findElement({tag: "form"}, ipt, (form) => {
                                        let btn = form.querySelector('[formsubmitter]');

                                        if(ipt.value.match(/(\D{6})(\d\d)(\D\d\d)(\D\d\d)(\d\D)/i)) {
                                                if(btn.isDisabled()) {
                                                        btn.removeAttribute("disabled");
                                                }
                                        } else {
                                                btn.setAttribute("disabled", "true");
                                        }
                                });
                        }

                        VerifyValue(input);

                        input.onkeyup = VerifyValue(input);
                }
        });

        //Show/hide password
        _(".input-group.password-input").forEach(pi => {
                if(!isDeclared(pi?.pwrevealer) && !isNull(pi.querySelector("span"))) {
                        let password_shown = false, password_field = pi.querySelector("input");

                        setMapping(pi, "pwrevealer");
                        pi.querySelector("span").on("click", function() {
                                password_shown = !password_shown;

                                if(password_shown) {
                                        this.removeAttribute("password-shown");
                                        password_field.setAttribute("type", "password");
                                } else {
                                        this.setAttribute("password-shown", "true");
                                        password_field.setAttribute("type", "text");
                                }
                        });
                }
        });

        //Ripple animate button
        _(".btn-ripple").forEach(btn => {
                if(!isDeclared(btn?.rippleanimation)) {
                        setMapping(btn, "rippleanimation");

                        btn.on("click", function() {
                                this.rippleAnimation();
                        });
                }
        });

        //Toasts
        _(".toast").forEach(t => {
                if(!isDeclared(t?.autoremove) && !t.hasAttribute("script-generated")) {
                        setMapping(t, "autoremove");

                        setTimeout(function() {
                                t.parentNode.removeChild(t);
                        }, 5000);
                }
        });

        //Input file
        _("div.input-group.file").forEach(i => {
                let
                        input = i.querySelector("input"),
                        files_list = i.querySelector("div.files-list"),
                        attached_files = [];

                if(!isDeclared(input?.inputfile)) {
                        setMapping(input, "inputfile");
                        input.value = null;

                        input.on("change", function() {
                                files_list.clearUp();

                                if(!this.files.empty()) {
                                        for(let x = 0;x<this.files.length;x++) {
                                                let file = this.files[x];

                                                if(file.size > 0 && !attached_files.inArray(file.name)) {
                                                        files_list.appendChild(new E({
                                                                type: "a",
                                                                class: ["pending-file", "btn-ripple"],
                                                                text: file.name
                                                        }));
                                                        attached_files.push(file.name);
                                                }
                                        }
                                }
                        });
                }        

        });
};
SystemFn(elementsRender);
setInterval(elementsRender, 1000); // Auto rendering and mapping