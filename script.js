const TASKS_DATA = "tasks-data";

let tasksList;

let tasks = { text: [], date: [], time: [] };

const today = new Date();

const currDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const currTime =
  today.getHours() +
  ":" +
  (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());

let date;
let time;

onload = () => {
  date = document.querySelector('input[type="date"]');
  time = document.querySelector('input[type="time"]');

  date.value = currDate;
  time.value = currTime;

  tasksList = document.querySelector(".tasks-list");
  loadTasks();
};

const onSubmitForm = (e) => {
  e.preventDefault();

  const taskInput = document.querySelector(".task-input");
  let taskText = taskInput.value
    .replace(/\n\r?/g, "<br/>")
    .replace(/\s/g, "&nbsp;");
  appendTask(taskText, date.value, time.value);
  tasks.text.push(taskText);
  tasks.date.push(date.value);
  tasks.time.push(time.value);
  saveTasks(tasks);
};

const onDeleteButton = (el) => {
  const indexOfElement = Array.from(el.parentNode.children).indexOf(el);
  tasks.text.splice(indexOfElement, 1);
  tasks.date.splice(indexOfElement, 1);
  tasks.time.splice(indexOfElement, 1);
  saveTasks(tasks);
  el.animate(
    [
      // keyframes
      {
        transform: "translateY(0px) translateX(0px) scale(1)",
        opacity: 1
      },
      {
        transform:
          "translateY(-300px) translateX(-50px) rotate(180deg) scale(0.5)",
          opacity: 0.5
      },
    ],
    { duration: 500 }
  );

  setTimeout(() => {
    el.remove();
  }, 500);
};

const ce = (e) => document.createElement(e);

const appendTask = (task, nDate, nTime) => {
  const listElement = ce("li");
  const taskElement = ce("p");

  appendDeleteButton(listElement);
  taskElement.innerHTML = task;
  listElement.append(taskElement);
  listElement.classList.add("task");
  tasksList.append(listElement);
  appendDate(listElement, nDate, nTime);
};

const appendDeleteButton = (el) => {
  const delButton = ce("button");
  delButton.classList.add("glyphicon", "glyphicon-remove", "delete-button");
  delButton.addEventListener("click", () => onDeleteButton(el));
  el.append(delButton);
};

const appendDate = (el, nDate, nTime) => {
  const dateElement = ce("time");
  const timeElement = ce("time");
  const dateBlock = ce("div");
  dateBlock.classList.add("date-container");

  const arr = nDate.split("-");
  const dateFormatted = arr[2] + "/" + arr[1] + "/" + arr[0];

  dateElement.setAttribute("datetime", dateFormatted);
  timeElement.setAttribute("datetime", nTime);

  dateElement.innerHTML = dateFormatted;
  timeElement.innerHTML = nTime;

  dateBlock.append(dateElement);
  dateBlock.append(timeElement);
  el.append(dateBlock);
};

const saveTasks = (tasks) => {
  const tasksJson = JSON.stringify(tasks);
  localStorage.setItem(TASKS_DATA, tasksJson);
};

const loadTasks = () => {
  const savedTasksJson = localStorage.getItem(TASKS_DATA);
  const savedTasks = JSON.parse(savedTasksJson);
  if (savedTasks !== null) {
    tasks = { ...savedTasks };
    tasks.text.forEach((task, index) => {
      appendTask(task, tasks.date[index], tasks.time[index]);
    });
  }
};
