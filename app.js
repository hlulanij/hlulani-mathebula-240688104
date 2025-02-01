

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const filters = document.querySelectorAll(".filters button");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.toggle("completed", task.completed);
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;
            taskList.appendChild(taskItem);

            const editButton = taskItem.querySelector(".edit");
            const deleteButton = taskItem.querySelector(".delete");

            editButton.addEventListener("click", () => editTask(index));
            deleteButton.addEventListener("click", () => deleteTask(index));

            taskItem.addEventListener("click", () => toggleComplete(index));
        });
    }

    function addTask() {
        if (taskInput.value.trim() !== "") {
            tasks.push({ text: taskInput.value.trim(), completed: false });
            taskInput.value = "";
            saveToLocalStorage();
            renderTasks();
        }
    }

    function editTask(index) {
        const newText = prompt("Edit Task", tasks[index].text);
        if (newText !== null && newText.trim() !== "") {
            tasks[index].text = newText.trim();
            saveToLocalStorage();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveToLocalStorage();
        renderTasks();
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveToLocalStorage();
        renderTasks();
    }

    function saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function filterTasks(filter) {
        if (filter === "all") {
            renderTasks();
        } else if (filter === "active") {
            const activeTasks = tasks.filter(task => !task.completed);
            renderFilteredTasks(activeTasks);
        } else if (filter === "completed") {
            const completedTasks = tasks.filter(task => task.completed);
            renderFilteredTasks(completedTasks);
        }
    }

    function renderFilteredTasks(filteredTasks) {
        taskList.innerHTML = "";
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.toggle("completed", task.completed);
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;
            taskList.appendChild(taskItem);

            const editButton = taskItem.querySelector(".edit");
            const deleteButton = taskItem.querySelector(".delete");

            editButton.addEventListener("click", () => editTask(index));
            deleteButton.addEventListener("click", () => deleteTask(index));

            taskItem.addEventListener("click", () => toggleComplete(index));
        });
    }

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    filters.forEach(filter => {
        filter.addEventListener("click", () => filterTasks(filter.id));
    });

    renderTasks();
});
