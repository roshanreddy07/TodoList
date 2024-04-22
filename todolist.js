let tempToDolist = [
    { id: 12367, todo: "Buy Java Script Book", isCompleted: false },
    { id: 38921, todo: "Go to gym", isCompleted: false },
    { id: 45383, todo: "Prepare  For Interview", isCompleted: false },
    { id: 12464, todo: "Practice Js Problems", isCompleted: false },
    { id: 15623, todo: "Buy  Milk", isCompleted: false },
];
let todoText;

let todoList =
    JSON.parse(localStorage.getItem("todos")) ||
    localStorage.setItem("todos", JSON.stringify(tempToDolist));

//this fn is used to add task
function addTask() {
    todoText = document.getElementById("todo-input");
    const randomFiveDigit =
        Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    todoList.push({
        id: randomFiveDigit,
        todo: todoText.value,
        isCompleted: false,
    });
    localStorage.setItem("todos", JSON.stringify(todoList));
    displayTodoListData();
    totalTasks();
    todoText.value = "";
}
// this fn is used to display the  list of tasks on the page
function displayTodoListData() {
    const tableBody = document.getElementById("todoTableData");
    tableBody.innerHTML = "";
    let todoList = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < todoList.length; i++) {
        const person = todoList[i];

        const tableRow = document.createElement("tr");
        const checkBoxCell = document.createElement("td");
        const nameCell = document.createElement("td");

        const removeCell = document.createElement("td");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("item-checkbox");
        checkBox.dataset.index = i;
        checkBox.checked = todoList[i].isCompleted ? true : false;
        const removeIcon = document.createElement("div");
        removeIcon.classList.add("delete-todo-icon");
        removeIcon.textContent = "X";
        removeIcon.dataset.index = i;

        nameCell.textContent = person.todo;
        nameCell.classList.add(
            "todo-list-name",
            todoList[i].isCompleted ? "strike" : "none"
        );

        checkBoxCell.appendChild(checkBox);
        removeCell.appendChild(removeIcon);
        tableRow.appendChild(checkBoxCell);
        tableRow.appendChild(nameCell);

        tableRow.appendChild(removeCell);

        todoTableData.appendChild(tableRow);

        // Add event listener for checkbox selection
        checkBox.addEventListener("change", handleCheckboxChange);

        // Add event listener for remove icon click
        removeIcon.addEventListener("click", handleRemoveClick);
    }
}

//this fn is  used to update the UI when a task is checked or unchecked
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const index = checkbox.dataset.index;
    let todoList = JSON.parse(localStorage.getItem("todos")) || [];
    todoList[index].isCompleted = checkbox.checked;
    localStorage.setItem("todos", JSON.stringify(todoList));
    // Logic for handling checkbox selection
    console.log(`Checkbox for object at index ${index} changed`);
    displayTodoListData();
}

//this fn is used to  delete tasks from the list
function handleRemoveClick(event) {
    const removeIcon = event.target;
    const index = removeIcon.dataset.index;

    // Remove the object from the array
    todoList.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todoList));
    // Update the table content
    displayTodoListData();
    totalTasks();
}

//this fn  is used to calculate and show the number of tasks in the To Do List
function totalTasks() {
    let totalTasksText = document.getElementById("total-tasks");
    // console.log(totalTasksText);
    totalTasksText.innerHTML = "";
    let todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
    if (!todos.length) {
        totalTasksText.innerHTML = 0;
    } else {
        totalTasksText.innerHTML = `${todos.length}`;
    }
}

displayTodoListData();
totalTasks();
