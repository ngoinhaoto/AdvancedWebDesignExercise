import React, { useState } from "react";
import EditPopUp from "./EditPopUp";

import {
  deleteTaskOnServer,
  updateTaskStatusOnServer,
} from "../apis/handlingAPIs";

export default function Task({
  taskName,
  taskStatus,
  taskID,
  deleteTask,
  onSave,
}) {
  const [currentStatus, setCurrentStatus] = useState(taskStatus);

  const [isEditPopUpVisible, setEditPopUpVisibility] = useState(false);

  const handleStatusClick = async () => {
    let newStatus;
    if (currentStatus === "not-started") {
      newStatus = "in-progress";
    } else if (currentStatus === "in-progress") {
      newStatus = "finished";
    } else {
      newStatus = "not-started";
    }

    try {
      await updateTaskStatusOnServer(taskID, newStatus);
      setCurrentStatus(newStatus); // Update the task's status locally
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteTaskOnServer(taskID);
      deleteTask(taskID); //  deleteTask function with the task's id
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = () => {
    setEditPopUpVisibility(true);
  };

  return (
    <div className="task-wrapper">
      <div className="task-card">
        <div className="button-row">
          <button className="delete-task-button" onClick={handleDeleteClick}>
            Delete <i className="fa-solid fa-trash"></i>
          </button>{" "}
          <button className="edit-task-button" onClick={handleEditClick}>
            Edit <i className="fa-solid fa-pen"></i>
          </button>{" "}
        </div>
        <div className="task-body-name">{taskName}</div>
        <button
          className={`custom-button ${currentStatus}`}
          onClick={handleStatusClick}
        >
          {currentStatus === "in-progress"
            ? "In Progress"
            : currentStatus === "finished"
            ? "Finished"
            : "Not Started"}
        </button>{" "}
        {isEditPopUpVisible && (
          <EditPopUp
            onClose={() => setEditPopUpVisibility(false)}
            initialTaskName={taskName}
            taskID={taskID}
            onSave={(editedTaskID, editedTaskName) => {
              onSave(editedTaskID, editedTaskName);
              setEditPopUpVisibility(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
