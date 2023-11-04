import React, { useState } from "react";

export default function Task({
  taskName,
  taskStatus,
  setEditPopUpVisible,
  taskID,
  deleteTask,
  setSelectedTask,
}) {
  const [currentStatus, setCurrentStatus] = useState(taskStatus);

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
    setEditPopUpVisible(true, taskName, taskID);
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
      </div>
    </div>
  );
}
