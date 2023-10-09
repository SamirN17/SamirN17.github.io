const inputBox = document.getElementById("input-box");
const dateInput = document.getElementById("date-input");
const listContainer = document.getElementById("list-container");
const colorCode = document.getElementById("color-code");
const subtasksBox = document.getElementById("subtasks-box");

function addTask() {
    const subtasks = subtasksBox.value.split('\n').filter(subtask => subtask.trim() !== '');
    if (inputBox.value === '' || dateInput.value === '') {
        alert("Please write a task and set a due date.");
    } else {
        let li = document.createElement("li");
        li.classList.add(colorCode.value);
        li.innerHTML = `${inputBox.value} <strong>(Due: ${dateInput.value})</strong>`;
        if (subtasks.length > 0) {
            let subtasksList = document.createElement("ul");
            subtasks.forEach(subtask => {
                let subtaskItem = document.createElement("li");
                subtaskItem.innerText = subtask;
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                subtaskItem.appendChild(span);
                subtasksList.appendChild(subtaskItem);
            });
            li.appendChild(subtasksList);
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    
    inputBox.value = "";
    subtasksBox.value = "";
    dateInput.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI" && !e.target.parentElement.matches("#list-container")) {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        if (e.target.parentElement.parentElement.matches("#list-container")) {
            e.target.parentElement.remove();
        } else {
            e.target.parentElement.remove();
        }
        saveData();
    }
}, false);

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");

        const subtaskList = e.target.querySelector("ul");
        if (subtaskList) {
            subtaskList.childNodes.forEach(subtask => {
                subtask.classList.toggle("checked", e.target.classList.contains("checked"));
            });
        }
        
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        if (e.target.parentElement.parentElement === listContainer) {
            e.target.parentElement.remove()
        } else {
        e.target.parentElement.remove();
        }
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function addSubTask() {
    const subTaskInput = document.getElementById("subtask-input");
    
    if (subTaskInput.value !== '') {
        subTasks.push(subTaskInput.value);
        subTaskInput.value = '';
    } else {
        alert("Please write a subtask.");
    }
}