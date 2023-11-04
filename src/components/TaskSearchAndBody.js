import React, { useState } from "react";
import TaskSearchCreate from "./TaskSearchCreate";
import TaskTable from "./TaskTable";
import CreatePopUp from "./CreatePopUp";
import EditPopUp from "./EditPopUp";

export default function TaskSearchAndBody() {
  const [isCreatePopUpVisible, setCreatePopUpVisible] = useState(false);

  const [isEditPopUpVisible, setEditPopUpVisible] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [newTaskName, setNewTaskName] = useState("");

  const initialTasks = [
    { id: 1, taskStatus: "in-progress", taskName: "do ur mom" },
    { id: 2, taskStatus: "finished", taskName: "get pc" },
    { id: 3, taskStatus: "not-started", taskName: "do chore" },
  ];

  //add setTasks, when create task using api
  const [tasks, setTasks] = useState(initialTasks);

  const handleCreateTask = () => {
    // Validate newTaskName if necessary
    const newTask = {
      id: tasks.length + 1, // can replace this with fancy unique id
      taskName: newTaskName,
      taskStatus: "not-started",
    };

    setTasks([...tasks, newTask]); // Add the new task to the tasks state
    setNewTaskName(""); // Clear the input field
    setCreatePopUpVisible(false);
  };

  return (
    <div className="container">
      <TaskSearchCreate
        setCreatePopUpVisible={setCreatePopUpVisible}
        setSearchText={setSearchText}
      />

      <TaskTable
        setEditPopUpVisible={setEditPopUpVisible}
        searchText={searchText}
        tasks={tasks}
      />

      {isCreatePopUpVisible && (
        <CreatePopUp
          onClose={() => setCreatePopUpVisible(false)}
          newTaskName={newTaskName} // Pass the state as a prop
          setNewTaskName={setNewTaskName} // Pass the function as a prop
          onCreateTask={handleCreateTask} // Pass the function as a prop
        />
      )}

      {isEditPopUpVisible && (
        <EditPopUp onClose={() => setEditPopUpVisible(false)} />
      )}
    </div>
  );
}
