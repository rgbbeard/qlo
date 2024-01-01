class ConfirmDialog {
	constructor(data = {
		confirmAction: undefined,
		cancelAction: undefined,
		cancelText: "",
		confirmText: "",
		deleteOnConfirm: true,
		deleteOnCancel: true,
		title: ""
	}) {
		this.cancelText = "Annulla";
		this.confirmText = "Conferma";
		this.confirmAction = function() {};
		this.cancelAction = function() {};
		this.deleteOnCancel = true;
		this.deleteOnConfirm = true;

		this.setParams(data);

		let confirmId = "#confirm_dialog_" + (_(".confirm-window-background").length + 1);
		let confirm = new E({
			type: "div",
			id: [confirmId],
			class: ["confirm-window-background"],
			children: [
				new E({
					type: "div",
					class: ["confirm-window-content"],
					children: [
						new E({
							type: "h3",
							class: ["confirm-window-title"],
							text: String(data.title)
						}),
						new E({
							type: "span",
							class: ["btn-ripple", "secondary"],
							text: this.cancelText,
							click: () => {
								this.cancelAction.call();
								if (this.deleteOnCancel === true) this.deleteWindow();
							}
						}),
						new E({
							type: "span",
							class: ["btn-ripple", "warning"],
							text: String(data.confirmText),
							click: () => {
								this.confirmAction.call();
								if (this.deleteOnConfirm === true) this.deleteWindow();
							}
						})
					]
				})
			]
		});
		this.confirm = confirm;
		return confirm;
	}

	setParams(data) {
		//Set cancel button text
		if (isDeclared(data.cancelText)) this.cancelText = String(data.cancelText);
		//Set confirm button text
		if (isDeclared(data.confirmText)) this.confirmText = String(data.confirmText);
		//Perform action on confirmation
		if (isDeclared(data.confirmAction) && data.confirmAction.isFunction()) this.confirmAction = data.confirmAction;
		//Perform action on cancelation
		if (isDeclared(data.cancelAction) && data.cancelAction.isFunction()) this.cancelAction = data.cancelAction;
		//Remove confirmation window on button click
		if (isDeclared(data.deleteOnCancel) && Boolean(data.deleteOnConfirm) === false) this.deleteOnCancel = false;
		if (isDeclared(data.deleteOnConfirm) && Boolean(data.deleteOnConfirm) === false) this.deleteOnConfirm = false;
	}

	deleteWindow() {
		this.confirm.parentNode.removeChild(this.confirm);
	}
}