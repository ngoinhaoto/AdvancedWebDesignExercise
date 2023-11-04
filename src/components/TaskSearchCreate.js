import React, { useState } from "react";
import SearchBar from "./SearchBar";

export default function TaskSearchCreate({ setCreatePopUpVisible }) {
  const handleNewTaskClick = () => {
    setCreatePopUpVisible(true);
  };

  return (
    <div className="taskSearchCreateWrapper">
      <SearchBar />

      <button id="newTask" className="new-task" onClick={handleNewTaskClick}>
        New task
      </button>
    </div>
  );
}
