import React, { useState } from "react";
import EditPopUp from "./EditPopUp";
export default function Task({
  taskName,
  taskStatus,
  taskID,
  deleteTask,
  onSave,
}) {
  const [currentStatus, setCurrentStatus] = useState(taskStatus);

  const [isEditPopUpVisible, setEditPopUpVisibility] = useState(false);

  const handleStatusClick = () => {
    let newStatus;
    if (currentStatus === "not-started") {
      newStatus = "in-progress";
    } else if (currentStatus === "in-progress") {
      newStatus = "finished";
    } else {
      newStatus = "not-started";
    }

    setCurrentStatus(newStatus);
    // updateTaskStatus(taskName, newStatus); // remember to use API in this function
  };

  const handleDeleteClick = () => {
    deleteTask(taskID); // Call the deleteTask function with the task's id
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
              // Handle save logic here, you can call your parent component's function here
              // Example: handleEditTask(editedTaskID, editedTaskName);
              onSave(editedTaskID, editedTaskName);
              setEditPopUpVisibility(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
