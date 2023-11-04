import React, { useState } from "react";

export default function CreatePopUp({
  onClose,
  newTaskName,
  setNewTaskName,
  onCreateTask,
}) {
  const [isModalVisible, setModalVisible] = useState(true);

  const hideModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <div className={`modal ${isModalVisible ? "active" : ""}`}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>Create new task</h2>
          <button className="close" onClick={hideModal}>
            &times;
          </button>{" "}
        </div>
        <div className="modal-content">
          <h2>Add your task</h2>
          <input
            type="text"
            placeholder="Name your task"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            id="taskCreateField"
          />
          <button id="taskCreateButton" onClick={onCreateTask}>
            Create task
          </button>
        </div>
      </div>
    </div>
  );
}
