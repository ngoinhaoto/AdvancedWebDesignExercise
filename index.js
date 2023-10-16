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

function updateTaskStatus(taskName, newStatus) {
  tasks.forEach((task) => {
    if (task.name === taskName) {
      task.status = newStatus;

      updateTaskStatusOnServer(task.id, newStatus);
    }
  });
}

function createTaskCards(taskID, taskName, taskStatus) {
  let taskWrapper = document.createElement("div");
  taskWrapper.classList.add("task-wrapper");

  taskWrapper.setAttribute("data-task-id", taskID); // store id
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

      console.log("id of this task is ", taskID);

      updateTaskNameOnServer(taskID, taskNewName);
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
    const taskId = taskID;

    deleteTaskOnServer(taskId);

    taskWrapper.remove();
  });

  // Append elements
  buttonRow.appendChild(deleteButton);
  buttonRow.appendChild(editButton);
  taskCard.appendChild(buttonRow);
  taskCard.appendChild(taskBody);
  taskCard.appendChild(statusButton);
  taskWrapper.appendChild(taskCard);
  taskContainer.appendChild(taskWrapper);

  // saveToLocalStorage(); // no need to save again.
}

// function saveToLocalStorage() {
//   const taskItems = Array.from(document.querySelectorAll(".task-wrapper"));
//   const tasks = [];

//   taskItems.forEach((task) => {
//     let taskName = task.querySelector(".task-body-name").textContent;
//     let taskStatus = task.querySelector(".custom-button").innerText;
//     let taskStatusClass = "";

//     if (taskStatus === "Finished") {
//       taskStatusClass = "finished";
//     } else if (taskStatus === "Not Started") {
//       taskStatusClass = "not-started";
//     } else if (taskStatus === "In Progress") {
//       taskStatusClass = "in-progress";
//     }

//     tasks.push({ name: taskName, status: taskStatusClass });
//   });

//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

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

  let taskWrappers = document.querySelectorAll(".task-wrapper");

  taskWrappers.forEach((taskWrapper) => {
    let taskNameElement = taskWrapper.querySelector(".task-body-name");
    let taskName = taskNameElement.textContent.toLowerCase();

    if (taskName.includes(searchText)) {
      taskWrapper.style.display = "block";
    } else {
      taskWrapper.style.display = "none";
    }
  });
}

let serverURL =
  "https://47e40cbd-ae3c-4e95-a418-5febec12a299.mock.pstmn.io/tasks";

let tasks = [];

console.log(tasks);
async function fetchTasks() {
  try {
    let response = await fetch(serverURL);
    if (response.ok) {
      tasks = await response.json();

      console.log(tasks);

      tasks = tasks.map((task) => {
        task.id = task.id;
        return task;
      });

      renderTasks();
    } else {
      console.error("Failed to fetch tasks from the server.");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

fetchTasks();

async function saveNewTaskToServer(taskName, status) {
  try {
    let response = await fetch(serverURL, {
      method: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskName,
        status: status,
      }),
    });

    if (response.ok) {
      let newTask = await response.json();
      console.log(newTask);

      tasks.push(newTask);
      renderTasks();
    } else {
      console.error("Failed to save task to the server.");
    }
  } catch (error) {
    console.error("Error saving task:", error);
  }
}

async function updateTaskNameOnServer(taskId, taskName) {
  try {
    let response = await fetch(`${serverURL}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: taskName }),
    });

    if (response.ok) {
      console.log("Task name updated successfully!");

      tasks.forEach((task) => {
        if (task.id === taskId) {
          task.name = taskName;
        }
      });
      renderTasks();
    } else {
      console.error("Failed to update task name on the server.");
    }
  } catch (error) {
    console.error("Error updating task name:", error);
  }
}
async function updateTaskStatusOnServer(taskId, newStatus) {
  try {
    let response = await fetch(`${serverURL}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (response.ok) {
      console.log(
        `Task with id ${taskId} with status updated to ${newStatus} on the server successfully!`
      );
    } else {
      console.error("Failed to update task status on the server.");
    }
  } catch (error) {
    console.error("error updating task status: ", error);
  }
}
createButton.onclick = function () {
  let taskName = taskInput.value.trim();
  // console.log("Task Name: ", taskName);

  saveNewTaskToServer(taskName, "not-started");
  taskInput.value = "";
  modal.classList.remove("active");
  modal.style.visibility = "hidden";
};

async function deleteTaskOnServer(taskId) {
  try {
    const response = await fetch(`${serverURL}/${taskId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Task with ID ${taskId} deleted successfully.`);
      // remove the task from task array.
      tasks = tasks.filter((task) => task.id !== taskId);
      console.log(tasks);
    } else {
      console.error(`Failed to delete task with ID ${taskId}.`);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

function renderTasks() {
  taskContainer.innerHTML = ""; // Clear existing tasks

  tasks.forEach((task) => {
    createTaskCards(task.id, task.name, task.status);
  });
}
