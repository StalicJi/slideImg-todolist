"use strict";
// Select Element
const form = document.getElementById("todoform");
const popWindow = document.getElementById("popup");
const cancel = document.getElementById("cancel");
const addlist = document.getElementById("addlist");
const msg = document.getElementById("msg");
const textArea = document.getElementById("textArea");
const dateInput = document.getElementById("dateInput");
const tasks = document.getElementById("tasks");
const tasksNote = document.getElementById("tasksNote");

// 條件
const formValidation = () => {
  if (textArea.value.trim() === "") {
    msg.innerHTML = "* 內容不能為空白";
  } else if (dateInput.value === "") {
    msg.innerHTML = "* 時間不能為空白";
  } else {
    msg.innerHTML = "";
    acceptData();
    resetUI();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    date: dateInput.value,
    text: textArea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTask();
};

const createTask = () => {
  tasks.innerHTML = "";

  data.map((value, i) => {
    return (tasks.innerHTML += `
    <div class="todolist__main__lists" id="${i}">
              <li class="todolist__main__list">${value.text}</li>
              <p class="todolist__main__time">${value.date}</p>
              <div class="todolist__btn todolist__main__lists">
                <i
                  class="bi bi-pencil-square"
                  id="edit"
                  onClick="editTask(this)"
                ></i>
                <i
                  class="bi bi-trash3"
                  id="deleted"
                  onClick="deleteTask(this);createTask()"
                ></i>
              </div>
            </div>
    `);
  });

  resetForm();
};

const resetForm = () => {
  dateInput.value = "";
  textArea.value = "";
};

const editTask = (e) => {
  const selectTask = e.parentElement.parentElement;

  dateInput.value = selectTask.children[1].innerHTML;
  textArea.value = selectTask.children[0].innerHTML;

  deleteTask(e);
  popupUI();
};

const deleteTask = (e) => {
  let todo = e.parentElement.parentElement;
  let todoId = todo.id;
  todo.remove();
  data.splice(todoId, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

// 監聽事件
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

addlist.addEventListener("click", (e) => {
  e.preventDefault();
  popupUI();
});

cancel.addEventListener("click", (e) => {
  e.preventDefault();
  resetUI();
});

// UI
const resetUI = () => {
  popWindow.style.opacity = "0";
  popWindow.style.visibility = "hidden";
};
const popupUI = () => {
  popWindow.style.opacity = "1";
  popWindow.style.visibility = "visible";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
  console.log(data);
})();

// initUI
resetUI();
