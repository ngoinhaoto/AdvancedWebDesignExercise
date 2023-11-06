import React, { useState, useEffect } from "react";
import TaskSearchCreate from "./TaskSearchCreate";
import TaskTable from "./TaskTable";
import CreatePopUp from "./CreatePopUp";

import { fetchTasksFromServer, createTaskOnServer } from "../apis/handlingAPIs";

import { v4 as uuidv4 } from "uuid";

export default function TaskSearchAndBody() {
  const [isCreatePopUpVisible, setCreatePopUpVisible] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [newTaskName, setNewTaskName] = useState("");

  const deleteTask = (taskID) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(updatedTasks);
  };

  const handleSaveTask = (editedTaskID, editedTaskName) => {
    // Update tasks state with the edited task name
    const updatedTasks = tasks.map((task) =>
      task.id === editedTaskID ? { ...task, name: editedTaskName } : task
    );
    setTasks(updatedTasks);
  };

  //add setTasks, when create task using api
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = async () => {
    try {
      const newTask = {
        id: uuidv4(),
        name: newTaskName,
        status: "not-started",
      };

      const createdTask = await createTaskOnServer(newTask);
      setTasks([...tasks, createdTask]); // Add the new task to the tasks state
      setNewTaskName(""); // Clear the input field
      setCreatePopUpVisible(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  //getting tasks from the postman server
  useEffect(() => {
    async function getData() {
      let result;
      result = await fetchTasksFromServer();

      setTasks(result);
    }

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
    </div>
  );
}
