const elementsRender = function() {
    //Ripple animate button
    $(".btn-ripple").each(btn => {
        btn?.on("click", function() {
            this.rippleAnimation();
        });
    });

    //Toasts
    $(".toast").each(t => {
        if(!isDeclared(t?.attr("autoremove")) && !t?.attr("script-generated")) {
            const s = setTimeout(() => {
                t.parentNode.removeChild(t);
            }, 5000);
            clearTimeout(s);
        }
    });
};
SystemFn(elementsRender);
setInterval(elementsRender, 1000);