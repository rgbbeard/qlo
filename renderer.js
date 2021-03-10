function elementsRenderer() {
    //Validate addresses
    _('[validateaddress]').forEach(input => {
        input.onkeyup = function() {
            //Remove commas
            if(this.value.match(/\,+/i)) {
                let v = this.value.replaceAll(",", "");
                this.value = v;
            }
        };
    });
    //Validate email
    _('[validatemail]').forEach(input => {
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
    });
    //Validate italian fiscal code
    _('[validateitfcode]').forEach(input => {
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
    });
}
SystemFn(elementsRenderer);