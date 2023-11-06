const serverURL =
  "https://4f74729f-451e-4a98-843e-686bfd957549.mock.pstmn.io/tasks";

export async function fetchTasksFromServer() {
  try {
    const response = await fetch(serverURL);
    if (!response.ok) {
      throw new Error("Network response isnt okay");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function createTaskOnServer(newTask) {
  try {
    const response = await fetch(serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error("Network response isnt okay");
    }

    const data = await response.json();

    console.log(
      `Task with id ${data.id} and name ${data.name} has been created`
    );
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

export async function deleteTaskOnServer(taskId) {
  try {
    const response = await fetch(`${serverURL}/${taskId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Task with ID ${taskId} deleted successfully.`);
    } else {
      console.error(`Failed to delete task with ID ${taskId}.`);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

export async function updateTaskStatusOnServer(taskId, newStatus) {
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

export async function updateTaskNameOnServer(taskId, taskName) {
  try {
    let response = await fetch(`${serverURL}/name/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: taskName }),
    });

    if (response.ok) {
      console.log(`Task with ID ${taskId} name updated successfully.`);
    } else {
      console.error(`Failed to update name for task with ID ${taskId}.`);
    }
  } catch (error) {
    console.error("Error updating task name:", error);
  }
}
