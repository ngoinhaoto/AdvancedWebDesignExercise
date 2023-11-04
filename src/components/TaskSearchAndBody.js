import React, { useState } from "react";
import TaskSearchCreate from "./TaskSearchCreate";
import TaskTable from "./TaskTable";
import CreatePopUp from "./CreatePopUp";
import EditPopUp from "./EditPopUp";

export default function TaskSearchAndBody() {
  const [isCreatePopUpVisible, setCreatePopUpVisible] = useState(false);

  const [isEditPopUpVisible, setEditPopUpVisible] = useState(false);

  return (
    <div className="container">
      <TaskSearchCreate setCreatePopUpVisible={setCreatePopUpVisible} />

      <TaskTable setEditPopUpVisible={setEditPopUpVisible} />
      {isCreatePopUpVisible && (
        <CreatePopUp onClose={() => setCreatePopUpVisible(false)} />
      )}

      {isEditPopUpVisible && (
        <EditPopUp onClose={() => setEditPopUpVisible(false)} />
      )}
    </div>
  );
}
