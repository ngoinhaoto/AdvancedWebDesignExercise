import Task from "./Task";

export default function TaskTable({ setEditPopUpVisible }) {
  return (
    <div className="task-container">
      <Task
        taskStatus={"in-progress"}
        taskName={"doing ur mom"}
        setEditPopUpVisible={setEditPopUpVisible}
      />
      <Task
        taskStatus={"finished"}
        taskName={"ur pc"}
        setEditPopUpVisible={setEditPopUpVisible}
      />
      <Task
        taskStatus={"not-started"}
        taskName={"bazinga"}
        setEditPopUpVisible={setEditPopUpVisible}
      />
    </div>
  );
}
