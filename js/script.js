const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const completeList = document.querySelector(".list-tasks")

let listItems = [];

function addNewTask() {
    listItems.push({
        task: input.value,
        complete: false
    });

    input.value = "";

    showTasks();
}

function showTasks(){   
    
    let newList = "";

    // ["Comprar café", "Estudar programação"]

    listItems.forEach( (item, position) => {
        newList = newList + `
            <li class="task ${item.complete && "done"}">
                <img src="./image/checked.png" alt="check-na-tarefa" onclick="completeTask(${position})">
                <p>${item.task  }</p>
                <img src="./image/trash.png" alt="excluir-tarefa" onclick="deleteItem(${position})">
            </li>
        `
    })

    completeList.innerHTML = newList;

    localStorage.setItem("list", JSON.stringify(listItems))

}

function completeTask(position) {
    listItems[position].complete = !listItems[position].complete

    showTasks()
}

function deleteItem(position) {
    listItems.splice(position, 1)

    showTasks()
}

function reloadTasks() {
    const taskLocalStorage = localStorage.getItem("list")

    if(taskLocalStorage){
    listItems = JSON.parse(taskLocalStorage) 
    }
    
    showTasks()
}

reloadTasks()
button.addEventListener("click", addNewTask)