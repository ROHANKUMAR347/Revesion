// src/components/Auth.js
import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Input } from "@chakra-ui/react";

const Auth = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await axios.post("http://localhost:4000/register", { username, password });
  };

  const handleLogin = async () => {
    const response = await axios.post("http://localhost:4000/login", {
      username,
      password,
    });
    setToken(response.data.token);
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box>
        <Button onClick={handleRegister}>Register</Button>
        <Button onClick={handleLogin}>Login</Button>
      </Box>
    </Box>
  );
};

export default Auth;
