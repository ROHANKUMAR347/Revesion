// src/components/ToDoList.js
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Box, Button, Input, List, ListItem } from "@chakra-ui/react";

const socket = io("http://localhost:4000");

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    socket.on("tasks", (tasks) => setTasks(tasks));
    return () => {
      socket.off("tasks");
    };
  }, []);

  const addTask = () => {
    socket.emit("addTask", { title: newTask, status: "not started" });
    setNewTask("");
  };

  const updateTask = (id, status) => {
    socket.emit("updateTask", { id, status });
  };

  const deleteTask = (id) => {
    socket.emit("deleteTask", id);
  };

  return (
    <Box>
      <Input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            {task.title} - {task.status}
            <Button onClick={() => updateTask(task.id, "in progress")}>
              In Progress
            </Button>
            <Button onClick={() => updateTask(task.id, "completed")}>
              Completed
            </Button>
            <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ToDoList;
