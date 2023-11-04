export default function Task({ taskName, taskStatus, setEditPopUpVisible }) {
  return (
    <div className="task-wrapper">
      <div className="task-card">
        <div className="button-row">
          <button className="delete-task-button">
            Delete <i className="fa-solid fa-trash"></i>
          </button>
          <button
            className="edit-task-button"
            onClick={() => setEditPopUpVisible(true)}
          >
            Edit <i className="fa-solid fa-pen"></i>
          </button>{" "}
        </div>
        <div className="task-body-name">{taskName}</div>
        <button className={`custom-button ${taskStatus}`}>
          {taskStatus === "in-progress"
            ? "In Progress"
            : taskStatus === "finished"
            ? "Finished"
            : taskStatus === "not-started"
            ? "Not Started"
            : "Unknown Status"}
        </button>{" "}
      </div>
    </div>
  );
}
