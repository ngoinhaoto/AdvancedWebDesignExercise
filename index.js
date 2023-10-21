// BUILDING MODAL POP UPS
let modal = document.getElementById("myModal");
let btn = document.getElementById("newTask");
let closeBtn = document.getElementsByClassName("close")[0];

// let editModal = document.getElementById("editingModal");
// let editingCloseBtn = document.getElementsByClassName("editingClose")[0];

let currentEditName = "";
let currentEditID = "";
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
  // if (event.target === editModal) {
  //   editModal.classList.remove("active");
  //   editModal.style.visibility = "hidden";
  // }
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
    // Create elements for the editing modal content
    let editingModal = document.createElement("div");
    editingModal.classList.add("editing-modal");
    editingModal.id = "editingModal";

    let editingModalBox = document.createElement("div");
    editingModalBox.classList.add("editing-modal-box");
    editingModalBox.id = "editingModalBox";

    let editingModalHeader = document.createElement("div");
    editingModalHeader.classList.add("editing-modal-header");

    let modalTitle = document.createElement("h2");
    modalTitle.style.color = "white";
    modalTitle.textContent = "Editing your task";

    let closeButton = document.createElement("button");
    closeButton.classList.add("editing-close");
    closeButton.innerHTML = "&times;";

    editingModalHeader.appendChild(modalTitle);
    editingModalHeader.appendChild(closeButton);

    let editingModalContent = document.createElement("div");
    editingModalContent.classList.add("editing-modal-content");

    let editTaskLabel = document.createElement("h2");
    editTaskLabel.textContent = "Edit your task";

    let taskEditField = document.createElement("input");
    taskEditField.type = "text";
    taskEditField.placeholder = "Edit your task name";
    taskEditField.id = "taskEditField";

    let saveChangesButton = document.createElement("button");
    saveChangesButton.id = "taskEditButton";
    saveChangesButton.textContent = "Save Changes";

    editingModalContent.appendChild(editTaskLabel);
    editingModalContent.appendChild(taskEditField);
    editingModalContent.appendChild(saveChangesButton);

    editingModalBox.appendChild(editingModalHeader);
    editingModalBox.appendChild(editingModalContent);

    editingModal.appendChild(editingModalBox);

    // Get the big-container element and append the editing modal
    let bigContainer = document.querySelector(".big-container");
    bigContainer.appendChild(editingModal);

    editingModal.style.visibility = "visible";
    editingModal.classList.add("active");

    taskEditField.value = taskBody.innerText;

    saveChangesButton.addEventListener("click", function () {
      let taskNewName = taskEditField.value;

      taskBody.innerText = taskNewName;

      updateTaskNameOnServer(taskID, taskNewName);

      taskName = taskNewName;

      editingModal.classList.remove("active");
      editingModal.style.visibility = "hidden";

      editingModal.remove();
    });

    // Add close functionality to the close button
    closeButton.addEventListener("click", function () {
      editingModal.remove(); // Remove the modal when the close button is clicked
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
  "https://4f74729f-451e-4a98-843e-686bfd957549.mock.pstmn.io/tasks";

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
    let response = await fetch(`${serverURL}/name/${taskId}`, {
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

      // renderTasks();
    } else {
      console.error("Failed to update task name on the server.");
    }
  } catch (error) {
    console.error("Error updating task name:", error);
  }
}

async function updateTaskStatusOnServer(taskId, newStatus) {
  try {
    let response = await fetch(`${serverURL}/status/${taskId}`, {
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
