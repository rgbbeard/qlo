const elementsRender = function() {
        //Validate addresses
        $('[validateaddress]').each(input => {
                if(!isDeclared(input?.validateaddress)) {
                        setMapping(input, "validateaddress");

                        input.on("keyup", function() {
                                //Remove commas
                                if(this.value().match(/\,+/i)) {
                                        this.value(this.value().replaceAll(",", ""));
                                }
                        });
                }
        });
    
        //Validate email
        $('[validatemail]').each(input => {
                if(!isDeclared(input?.validatemail)) {
                       setMapping(input, "validatemail");

                        function VerifyValue(ipt) {
                                let form = findElement({tag: "form"}, ipt, (form) => {
                                        let btn = form.getIfExists('[formsubmitter]');

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
         $('[validateitfcode]').each(input => {
                if(!isDeclared(input?.validateitfcode)) {
                        setMapping(input, "validateitfcode");

                        function VerifyValue(ipt) {
                                let form = findElement({tag: "form"}, ipt, (form) => {
                                        let btn = form.getIfExists('[formsubmitter]');

                                        if(ipt.value().match(/(\D{6})(\d\d)(\D\d\d)(\D\d\d)(\d\D)/i)) {
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
        $(".input-group.password-input").each(pi => {
                if(!isDeclared(pi?.pwrevealer) && !isNull(pi.getIfExists("span"))) {
                        let password_shown = false, password_field = pi.getIfExists("input");

                        setMapping(pi, "pwrevealer");
                        pi.getIfExists("span").on("click", function() {
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
        $(".btn-ripple").each(btn => {
                if(!btn.rippleanimation) {
                        btn.rippleanimation = 1;

                        btn.on("click", function() {
                                this.rippleAnimation();
                        });
                }
        });

        //Toasts
        $(".toast").each(t => {
                if(!isDeclared(t?.autoremove) /*&& !t?.attribute("script-generated")*/) {
                        const s = setTimeout(() => {
                                t.parentNode.removeChild(t);
                        }, 5000);
                        clearTimeout(s);
                }
        });

        //Input file
        $("div.input-group.file").each(i => {
                let
                        input = i.getIfExists("input"),
                        files_list = i.getIfExists("div.files-list"),
                        attached_files = [];

                if(!isDeclared(input?.inputfile)) {
                        setMapping(input, "inputfile");
                        input.value(null);

                        input.on("change", function() {
                                files_list.reset();

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