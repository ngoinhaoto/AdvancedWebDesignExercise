// ----- init local storage --------------------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

console.log(tasks);

// BUILDING MODAL POP UPS
let modal = document.getElementById("myModal");
let btn = document.getElementById("newTask");
let closeBtn = document.getElementsByClassName("close")[0];

let editModal = document.getElementById("editingModal");
let editingCloseBtn = document.getElementsByClassName("editingClose")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.classList.add("active");
  modal.style.visibility = "visible";
};

// When the user clicks on the close button, close the modal
closeBtn.onclick = function () {
  modal.classList.remove("active");
  modal.style.visibility = "hidden";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.classList.remove("active");
    modal.style.visibility = "hidden";
  }
  if (event.target === editModal) {
    editModal.classList.remove("active");
    editModal.style.visibility = "hidden";
  }
};

// ----- handle the creating task ----
let taskInput = document.getElementById("taskCreateField");
let createButton = document.getElementById("taskCreateButton");
let taskContainer = document.querySelector(".task-container");

function createNewTask(taskName, status) {
  let taskWrapper = document.createElement("div");
  taskWrapper.classList.add("task-wrapper");

  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  let buttonRow = document.createElement("div");
  buttonRow.classList.add("button-row");

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-task-button");

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteButton.appendChild(document.createTextNode("Delete "));
  deleteButton.appendChild(deleteIcon);

  let editButton = document.createElement("button");
  editButton.classList.add("edit-task-button");
  let editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen");
  editButton.appendChild(document.createTextNode("Edit "));
  editButton.appendChild(editIcon);

  let taskBody = document.createElement("div");
  taskBody.classList.add("task-body-name");
  taskBody.innerText = taskName;

  let statusButton = document.createElement("button");
  statusButton.classList.add("custom-button", "not-started");
  statusButton.innerText = "Not Started";

  statusButton.addEventListener("click", function (event) {
    if (statusButton.classList.contains("not-started")) {
      statusButton.textContent = "In Progress";
      statusButton.classList.remove("not-started");
      statusButton.classList.add("in-progress");

      updateTaskStatus(taskName, "in-progress");
    } else if (statusButton.classList.contains("in-progress")) {
      statusButton.textContent = "Finished";
      statusButton.classList.remove("in-progress");
      statusButton.classList.add("finished");
      updateTaskStatus(taskName, "finished");
    } else {
      statusButton.textContent = "Not Started";
      statusButton.classList.remove("finished");
      statusButton.classList.add("not-started");
      updateTaskStatus(taskName, "not-started");
    }
  });

  editButton.addEventListener("click", function () {
    // when click the edit button, open the modal
    editModal.classList.add("active");
    editModal.style.visibility = "visible";
    let taskEditField = document.getElementById("taskEditField");

    // fill the popup field with the taskbody text
    taskEditField.value = taskBody.innerText;

    let taskEditButton = document.getElementById("taskEditButton");

    taskEditButton.addEventListener("click", function () {
      let taskNewName = taskEditField.value.trim();
      taskBody.innerText = taskNewName;
      saveToLocalStorage();
      editModal.classList.remove("active");
      editModal.style.visibility = "hidden";
    });

    let closeEditModel = document.getElementsByClassName("editing-close")[0];
    closeEditModel.addEventListener("click", function () {
      editModal.classList.remove("active");
      editModal.style.visibility = "hidden";
    });
  });

  deleteButton.addEventListener("click", function () {
    taskWrapper.remove();
    saveToLocalStorage();
  });

  // Append elements
  buttonRow.appendChild(deleteButton);
  buttonRow.appendChild(editButton);
  taskCard.appendChild(buttonRow);
  taskCard.appendChild(taskBody);
  taskCard.appendChild(statusButton);
  taskWrapper.appendChild(taskCard);
  taskContainer.appendChild(taskWrapper);

  // adding to tasks


  let newTask = { name: taskName, status: status };
  tasks.push(newTask);

  saveToLocalStorage();
}

function updateTaskStatus(taskName, newStatus) {
  tasks.forEach((task) => {
    if (task.name === taskName) {
      task.status = newStatus;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  saveToLocalStorage();
}

function createTaskCards(taskName, taskStatus) {
  let taskWrapper = document.createElement("div");
  taskWrapper.classList.add("task-wrapper");

  let taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  let buttonRow = document.createElement("div");
  buttonRow.classList.add("button-row");

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-task-button");

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteButton.appendChild(document.createTextNode("Delete "));
  deleteButton.appendChild(deleteIcon);

  let editButton = document.createElement("button");
  editButton.classList.add("edit-task-button");
  let editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen");
  editButton.appendChild(document.createTextNode("Edit "));
  editButton.appendChild(editIcon);

  let taskBody = document.createElement("div");
  taskBody.classList.add("task-body-name");
  taskBody.innerText = taskName;

  let statusButton = document.createElement("button");
  statusButton.classList.add("custom-button", taskStatus);
  if (taskStatus == "in-progress") {
    statusButton.innerText = "In Progress";
  } else if (taskStatus == "finished") {
    statusButton.innerText = "Finished";
  } else if (taskStatus == "not-started") {
    statusButton.innerText = "Not Started";
  }

  statusButton.addEventListener("click", function (event) {
    if (statusButton.classList.contains("not-started")) {
      statusButton.textContent = "In Progress";
      statusButton.classList.remove("not-started");
      statusButton.classList.add("in-progress");
      updateTaskStatus(taskName, "in-progress");
    } else if (statusButton.classList.contains("in-progress")) {
      statusButton.textContent = "Finished";
      statusButton.classList.remove("in-progress");
      statusButton.classList.add("finished");
      updateTaskStatus(taskName, "finished");
    } else {
      statusButton.textContent = "Not Started";
      statusButton.classList.remove("finished");
      statusButton.classList.add("not-started");
      updateTaskStatus(taskName, "not-started");
    }
  });

  editButton.addEventListener("click", function () {
    // when click the edit button, open the modal
    editModal.classList.add("active");
    editModal.style.visibility = "visible";
    let taskEditField = document.getElementById("taskEditField");

    // fill the popup field with the taskbody text
    taskEditField.value = taskBody.innerText;

    let taskEditButton = document.getElementById("taskEditButton");

    taskEditButton.addEventListener("click", function () {
      let taskNewName = taskEditField.value.trim();
      taskBody.innerText = taskNewName;
      saveToLocalStorage();
      editModal.classList.remove("active");
      editModal.style.visibility = "hidden";
    });

    let closeEditModel = document.getElementsByClassName("editing-close")[0];
    closeEditModel.addEventListener("click", function () {
      editModal.classList.remove("active");
      editModal.style.visibility = "hidden";
    });
  });

  deleteButton.addEventListener("click", function () {
    taskWrapper.remove();
    saveToLocalStorage();
  });

  // Append elements
  buttonRow.appendChild(deleteButton);
  buttonRow.appendChild(editButton);
  taskCard.appendChild(buttonRow);
  taskCard.appendChild(taskBody);
  taskCard.appendChild(statusButton);
  taskWrapper.appendChild(taskCard);
  taskContainer.appendChild(taskWrapper);
}

function saveToLocalStorage() {
  const taskItems = Array.from(document.querySelectorAll('.task-wrapper'));
  const tasks = [];

  taskItems.forEach((task) => {
    let taskName = task.querySelector('.task-body-name').textContent;
    let taskStatus = task.querySelector('.custom-button').innerText;
    let taskStatusClass = "";

    if (taskStatus === "Finished") {
      taskStatusClass = "finished";
    } else if (taskStatus === "Not Started") {
      taskStatusClass = "not-started";
    } else if (taskStatus === "In Progress") {
      taskStatusClass = "in-progress";
    }

    tasks.push({ name: taskName, status: taskStatusClass });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task) => {
    createTaskCards(task.name, task.status);
  });
}

loadTasks();

createButton.onclick = function () {
  let taskName = taskInput.value.trim();

  createNewTask(taskName, "not-started");

  taskInput.value = "";
  modal.classList.remove("active");
  modal.style.visibility = "hidden";

  saveToLocalStorage();

};

// adding searching
let searchInput = document.getElementById("textInput");
let searchIcon = document.getElementById("searchIcon");

searchIcon.addEventListener("click", function () {
  searchTasks();
});

searchInput.addEventListener("input", function () {
  searchTasks();
});

function searchTasks() {
  let searchText = searchInput.value.toLowerCase().trim();

  let filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchText)
  );

  taskContainer.innerHTML = "";

  filteredTasks.forEach((task) => {
    createTaskCards(task.name, task.status);
  });
}

