const TASKS_LIST = "tasks-list";

let tasksList;

let tasks = [];

onload = () => {
  tasksList = document.querySelector(".tasks-list");
  
  const savedTasks = localStorage.getItem(TASKS_LIST);

  if (savedTasks !== null) tasks = savedTasks.split(",");
  tasks.forEach((task) => appendTask(task));
  // console.log("onload called");
};

const onSubmitForm = (e) => {
  e.preventDefault();
  const taskInput = document.querySelector(".task-input");
  let taskText = taskInput.value
    .replace(/\n\r?/g, "<br/>")
    .replace(/\s/g, "&nbsp;");

  appendTask(taskText);
  tasks.push(taskText);
  saveTasks(tasks)
  taskInput.value = ""
  // console.log("onSubmitForm called", tasks, taskText);
};

const appendTask = (task) => {
  const listElement = document.createElement("li");
  const taskElement = document.createElement("p");
  appendDeleteButton(listElement);
  taskElement.innerHTML = task;
  listElement.append(taskElement);
  listElement.classList.add("task");
  // listElement.setAttribute("droppable", true);
  tasksList.append(listElement);
};

const appendDeleteButton = (el) => {
  const exitButton = document.createElement("button");
  exitButton.classList.add("glyphicon", "glyphicon-remove", "delete-button");
  exitButton.addEventListener("click", () => onDeleteButton(el));
  el.append(exitButton);
};

const onDeleteButton = (el) => {
  // console.log("onDeleteButton called");
  const indexOfElement = Array.from(el.parentNode.children).indexOf(el);
  tasks.splice(indexOfElement, 1);
  saveTasks(tasks)
  el.remove();
};

const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_LIST, tasks);
  if(tasks.length === 0) localStorage.removeItem(TASKS_LIST)
};
