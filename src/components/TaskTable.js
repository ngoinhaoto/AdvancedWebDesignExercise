import React from "react";
import Task from "./Task";

export default function TaskTable({
  setEditPopUpVisible,
  tasks,
  searchText,
  deleteTask,
}) {
  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="task-container">
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          taskID={task.id}
          taskStatus={task.taskStatus}
          taskName={task.taskName}
          setEditPopUpVisible={setEditPopUpVisible}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
