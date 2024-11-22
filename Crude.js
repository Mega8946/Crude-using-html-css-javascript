const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){
  const taskText = taskInput.value.trim();
  if(taskText == "") return;

  const task = {id: Date.now(), text: taskText };
  saveTaskLocalStorage(task);
  addTaskToDOM(task);
  taskInput.value = "";
}

function loadTasks(){
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}


function saveTaskLocalStorage(task){
  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(task){
  const taskItem = document.createElement("li");
  taskItem.className = "task";
  taskItem.dataset.id = task.id;

  taskItem.innerHTML = `
  <span>${task.text}</span>
  <button onClick="editTask(${task.id})">Edit</button>
  <button onClick="deleteTask(${task.id})">Delete</button>
  `;
  taskList.appendChild(taskItem)
}

function editTask(taskId){
  const taskItem = document.querySelector(`li[data-id="${taskId}"]`);
  const newTaskText = prompt("Edit Task : " ,taskItem.querySelector("span").textContent)
  
  if(newTaskText !=null && newTaskText.trim() !=""){
    taskItem.querySelector("span").textContent = newTaskText;
    updateTaskInLocalStorage(taskId, newTaskText);
  }
  function updateTaskInLocalStorage(taskId, newTaskText)
  {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(task => task.id == taskId);
    if(task) task.text = newTaskText ;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
function deleteTask(taskId){
  const taskItem = document.querySelector(`li[data-id='${taskId}']`)
  taskList.removeChild(taskItem);
  deleteTaskFromLocalStorage(taskId);
}
function deleteTaskFromLocalStorage(taskId){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}