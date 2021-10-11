const TASKS_LIST = "tasks-list";

let tasksList;

let tasks = [];

onload = () => {
  tasksList = document.querySelector(".tasks-list");

  loadTasks();
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
  saveTasks(tasks);
  taskInput.value = "";
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
  saveTasks(tasks);
  el.animate(
    [
      // keyframes
      { transform: "translateY(0px) translateX(0px) rotate(0deg)" },
      { transform: "translateY(-300px) translateX(-50px) rotate(180deg)" },
    ],
    { duration: 500 }
  );

  setTimeout(() => {
    el.remove();
  }, 500);
};

const saveTasks = (tasks) => {
  const tasksJson = JSON.stringify({ ...tasks });
  localStorage.setItem(TASKS_LIST, tasksJson);
};

const loadTasks = () => {
  const savedTasksJson = localStorage.getItem(TASKS_LIST);
  const savedTasksObj = JSON.parse(savedTasksJson);
  if (savedTasksJson !== null) tasks = Object.values(savedTasksObj);
  tasks.forEach((task) => appendTask(task));
};
