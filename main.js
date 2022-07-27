window.addEventListener("load", () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        const task = input.value;
        e.preventDefault();
        if (!task){
            alert("Add a task")
            return;
        };
        const task_element = document.createElement("div");
        task_element.classList.add("tasks")

        const task_content_element = document.createElement("div")
        task_content_element.classList.add("content")
        task_content_element.innerText = task

        task_element.appendChild(task_content_element);
        list_el.appendChild(task_element)
    })

})