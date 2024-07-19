import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Box, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react";

const socket = io("http://localhost:4000");

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    notStarted: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const handleTasksUpdate = (tasks) => {
      console.log("Received tasks:", tasks);
      const notStarted = tasks.filter(
        (task) => task.status === "not started"
      ).length;
      const inProgress = tasks.filter(
        (task) => task.status === "in progress"
      ).length;
      const completed = tasks.filter(
        (task) => task.status === "completed"
      ).length;
      setStats({ notStarted, inProgress, completed });
    };

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("tasks", handleTasksUpdate);

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("tasks", handleTasksUpdate);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <Box>
      <StatGroup>
        <Stat>
          <StatLabel>Not Started</StatLabel>
          <StatNumber>{stats.notStarted}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>In Progress</StatLabel>
          <StatNumber>{stats.inProgress}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Completed</StatLabel>
          <StatNumber>{stats.completed}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default AdminDashboard;
