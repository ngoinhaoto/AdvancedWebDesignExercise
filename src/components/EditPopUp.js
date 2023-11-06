import React, { useState } from "react";
import { updateTaskNameOnServer } from "../apis/handlingAPIs";

export default function EditPopUp({
  onClose,
  initialTaskName,
  taskID,
  onSave,
}) {
  const [taskName, setTaskName] = useState(initialTaskName);

  const handleInputChange = (e) => {
    console.log(e.target.value); // Check the input value and log it into the console to check, cái này em kĩ thôi
    setTaskName(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      // Call the API to update the task name on the server
      await updateTaskNameOnServer(taskID, taskName);
      // Call the parent component's onSave function to update the task name locally
      onSave(taskID, taskName);
      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error updating task name:", error);
    }
  };

  const hideModal = () => {
    onClose();
  };

  return (
    <div className="editing-modal active" id="editingModal">
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
