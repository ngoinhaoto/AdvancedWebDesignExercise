import React, { useState, useEffect } from "react";
import TaskSearchCreate from "./TaskSearchCreate";
import TaskTable from "./TaskTable";
import CreatePopUp from "./CreatePopUp";

import { fetchTasksFromServer } from "../apis/handlingAPIs";

export default function TaskSearchAndBody() {
  const [isCreatePopUpVisible, setCreatePopUpVisible] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [newTaskName, setNewTaskName] = useState("");

  const deleteTask = (taskID) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(updatedTasks);
  };

  // const initialTasks = [
  //   { id: 1, taskStatus: "in-progress", taskName: "do ur mom" },
  //   { id: 2, taskStatus: "finished", taskName: "get pc" },
  //   { id: 3, taskStatus: "not-started", taskName: "do chore" },
  // ];

  const handleSaveTask = (editedTaskID, editedTaskName) => {
    // Update tasks state with the edited task name
    const updatedTasks = tasks.map((task) =>
      task.id === editedTaskID ? { ...task, name: editedTaskName } : task
    );
    setTasks(updatedTasks);
  };

  //add setTasks, when create task using api
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = () => {
    // Validate newTaskName if necessary
    const newTask = {
      id: tasks.length + 1, // can replace this with fancy unique id
      name: newTaskName,
      status: "not-started",
    };

    setTasks([...tasks, newTask]); // Add the new task to the tasks state
    setNewTaskName(""); // Clear the input field
    setCreatePopUpVisible(false);
  };

  useEffect(() => {
    async function getData() {
      // debugger;

      let result;
      result = await fetchTasksFromServer();

      setTasks(result);
    }
    // debugger;

    getData();
  }, []);

  return (
    <div className="container">
      <TaskSearchCreate
        setCreatePopUpVisible={setCreatePopUpVisible}
        setSearchText={setSearchText}
      />

      <TaskTable
        searchText={searchText}
        tasks={tasks}
        deleteTask={deleteTask}
        onSaveTask={handleSaveTask}
      />
      {isCreatePopUpVisible && (
        <CreatePopUp
          onClose={() => setCreatePopUpVisible(false)}
          newTaskName={newTaskName}
          setNewTaskName={setNewTaskName}
          onCreateTask={handleCreateTask}
        />
      )}

      {/* {isEditPopUpVisible && (
        <EditPopUp
          onClose={() => setEditPopUpVisible(false)}
          isVisible={isEditPopUpVisible}
          // initialTaskName={initialTaskName}
          // taskID={taskID}
          onSave={handleEditTask}
        />
      )} */}
    </div>
  );
}
