import React from "react";
import Task from "./Task";

export default function TaskTable({
  tasks,
  searchText,
  deleteTask,
  onSaveTask,
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
          deleteTask={deleteTask}
          onSave={(editedTaskID, editedTaskName) => {
            onSaveTask(editedTaskID, editedTaskName);
          }}
        />
      ))}
    </div>
  );
}
