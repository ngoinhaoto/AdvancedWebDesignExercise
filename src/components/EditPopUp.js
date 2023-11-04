import React, { useState } from "react";

export default function EditPopUp({ onClose }) {
  const [isModalVisible, setModalVisible] = useState(true);

  const hideModal = () => {
    // setModalVisible(false);
    onClose();
  };

  return (
    <div
      class={`editing-modal ${isModalVisible ? "active" : ""}`}
      id="editingModal"
    >
      {" "}
      <div class="editing-modal-box" id="editingModalBox">
        <div class="editing-modal-header">
          <h2 className="edit-header">Editing your task</h2>
          <button class="editing-close" onClick={hideModal}>
            &times;
          </button>{" "}
        </div>
        <div class="editing-modal-content">
          <h2>Edit your task</h2>
          <input
            type="text"
            placeholder="Edit your task name"
            id="taskEditField"
          />
          <button id="taskEditButton">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
