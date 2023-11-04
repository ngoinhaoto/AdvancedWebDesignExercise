import Task from "./Task";

export default function TaskTable({ setEditPopUpVisible, tasks, searchText }) {
  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="task-container">
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          taskStatus={task.taskStatus}
          taskName={task.taskName}
          setEditPopUpVisible={setEditPopUpVisible}
        />
      ))}
    </div>
  );
}
