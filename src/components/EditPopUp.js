import React, { useState, useEffect } from "react";

export default function EditPopUp({
  onClose,
  isVisible,
  initialTaskName,
  taskID,
  onSave,
}) {
  const [taskName, setTaskName] = useState(initialTaskName);

  const handleInputChange = (e) => {
    console.log(e.target.value); // Check the input value
    setTaskName(e.target.value);
  };

  const handleSaveClick = () => {
    onSave(taskID, taskName);
    onClose();
  };

  useEffect(() => {
    console.log(initialTaskName); // Check the value of initialTaskName
    setTaskName(initialTaskName);
  }, [initialTaskName]);

  const hideModal = () => {
    onClose();
  };

  return (
    <div
      className={`editing-modal ${isVisible ? "active" : ""}`}
      id="editingModal"
    >
      <div className="editing-modal-box" id="editingModalBox">
        <div className="editing-modal-header">
          <h2 className="edit-header">Editing your task</h2>
          <button className="editing-close" onClick={hideModal}>
            &times;
          </button>
        </div>
        <div className="editing-modal-content">
          <h2>Edit your task</h2>
          <input
            value={taskName}
            onChange={handleInputChange}
            type="text"
            placeholder="Edit your task name"
            id="taskEditField"
          />
          <button id="taskEditButton" onClick={handleSaveClick}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
