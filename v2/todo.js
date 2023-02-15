SystemFn(function() {
	const loadTasks = function() {
		const r = new Request({
			method: "GET",
			url: "ajax/get_tasks.php",
			done: function(r) {
				try {
					const tasks = JSON.parse(r.return);
					if(tasks.empty()) {
						$("#tasks-count").value("0 tasks");
					} else {
						tasks.forEach(t => {
							element({
								type: "div"
							});
						});
					}
				} catch(e) {
					console.log(e);
				}
			}
		});
	};

	const insertTask = function(name, priority) {
		const r = new Request({
			method: "POST",
			url: "/ajax/insert_task.php",
			data: {
				name: name,
				priority: priority
			},
			done: function(r) {
				console.log(r.return);
			}
		});
	};

	const removeTask = function(name) {
		const r = new Request({
			method: "POST",
			url: "/ajax/remove_task.php",
			data: {
				name: name
			},
			done: function(r) {
				console.log(r.return);
			}
		});
	};

	const updateTask = function(name, priority) {
		const r = new Request({
			method: "POST",
			url: "/ajax/update_task.php",
			data: {
				name: name,
				priority: priority
			},
			done: function(r) {
				console.log(r.return);
			}
		});
	};

	const remove = function(target) {
		target.parentNode.removeChild(target);
	};

	$("#add-task").on("click", function() {
		const tmpTasksCount = $(".tmp-new-task").length()+1, tmpId = "tmp-new-task-"+tmpTasksCount;
		window.scrollTo(0, 0);
		$().appendChild(element({
			type: "div",
			id: [tmpId],
			class: ["tmp-new-task"],
			children: [
				element({
					type: "div",
					class: ["input-group"],
					children: [
						element({
							type: "input",
							id: ["tmp-task-name-"+tmpTasksCount],
							name: "tmp-task-name-"+tmpTasksCount,
							placeholder: "tmp-task-name",
							attributes: {
								"type": "text"
							}
						}),
						element({
							type: "label",
							for: "tmp-task-name-"+tmpTasksCount,
							text: "Task name"
						}),
						element({
							type: "p",
							text: "Priority"
						}),
						element({
							type: "select",
							id: ["tmp-task-priority-"+tmpTasksCount],
							name: "tmp-task-priority-"+tmpTasksCount,
							children: [
								element({
									type: "option",
									class: ["low-priority"],
									value: "0",
									text: "Low priority"
								}),
								element({
									type: "option",
									class: ["normal-priority"],
									value: "1",
									text: "Normal priority"
								}),
								element({
									type: "option",
									class: ["high-priority"],
									value: "2",
									text: "High priority"
								}),
								element({
									type: "option",
									class: ["max-priority"],
									value: "3",
									text: "Max priority"
								})
							]
						})
					]
				}),
				// Buttons
				element({
					type: "a",
					class: ["btn-ripple", "warning"],
					text: "Cancel",
					click: function() {
						remove(this.parentNode);
					}
				}),
				element({
					type: "a",
					class: ["btn-ripple", "success"],
					text: "Add",
					click: function() {
						const
							taskName = $("#tmp-task-name-"+tmpTasksCount).value(),
							taskPriority = $("#tmp-task-priority-"+tmpTasksCount).value();
						if(!taskName) {
							new Toast({
								text: "Invalid task name",
								appearance: "error"
							});
							return;
						}
						insertTask(taskName, taskPriority);
						remove(this.parentNode);
						loadTasks();
					}
				})
			]
		}));

		loadTasks();
	});

	loadTasks();
});