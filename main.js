window.addEventListener("load", onLoad);


function onLoad() {
    const tasks = loadTasks();
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_element = document.querySelector("#tasks");
    renderTasks(tasks, input, list_element);

    form.addEventListener('submit', (e) => {
        const task = input.value;
        
        e.preventDefault();
        if (!task){
            alert("Add a task")
            return;
        };

        tasks.push(task)

        localStorage.setItem("tasks", JSON.stringify(tasks))

        renderTask(task, input, list_element);
    });
};

function loadTasks(){
    const tasks = localStorage.getItem("tasks");
    if (tasks){
        return JSON.parse(tasks);
    } else { 
        return []
    }
};

function renderTasks(tasks, input, list_element) {
    tasks.forEach(task => {
        renderTask(task, input, list_element)
    });
};

function renderTask(task, input, list_element){
    const tasks = loadTasks();


    const task_element = document.createElement("div");
    task_element.classList.add("tasks");

    const task_content_element = document.createElement("div");
    task_content_element.classList.add("content");

    task_element.appendChild(task_content_element);

    const task_input_element = document.createElement("input");
    task_input_element.classList.add("text");
    task_input_element.type = "text";
    task_input_element.setAttribute("readonly", "readonly");
    task_input_element.value = task

    task_content_element.appendChild(task_input_element);

    const task_actions_element = document.createElement("div");
    task_actions_element.classList.add("actions");

    const task_edit_button = document.createElement("button");
    task_edit_button.classList.add("edit");
    task_edit_button.innerHTML = "Edit";

    const task_delete_button = document.createElement("button");
    task_delete_button.classList.add("delete");
    task_delete_button.innerHTML = "Delete"

    task_actions_element.appendChild(task_edit_button);
    task_actions_element.appendChild(task_delete_button);

    task_element.appendChild(task_actions_element);

    list_element.appendChild(task_element);

    input.value = "";

    task_edit_button.addEventListener("click", () => {
       if (task_edit_button.innerHTML.toLowerCase() == "edit"){
        task_input_element.removeAttribute("readonly");
        task_input_element.focus();
 
        task_edit_button.innerHTML = "Save";

       } else {
        task_input_element.setAttribute("readonly", "readonly");
        task_edit_button.innerHTML = "Edit"
       }
    });

    task_delete_button.addEventListener("click", () => {
       list_element.removeChild(task_element);
       tasks.splice(tasks.indexOf(task), 1)
       localStorage.setItem("tasks", JSON.stringify(tasks))
    });
};