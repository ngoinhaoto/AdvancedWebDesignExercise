import React from "react";
import Task from "./Task";

export default function TaskTable({
  tasks,
  searchText,
  deleteTask,
  onSaveTask,
}) {
  if (!tasks) {
    return <p>Loading tasks...</p>;
  }

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="task-container">
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          taskID={task.id}
          taskStatus={task.status}
          taskName={task.name}
          deleteTask={deleteTask}
          onSave={(editedTaskID, editedTaskName) => {
            onSaveTask(editedTaskID, editedTaskName);
          }}
        />
      ))}
    </div>
  );
}
