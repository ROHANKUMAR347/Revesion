// src/App.js
import React, { useState } from "react";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import Auth from "./Component/Auth";
import AdminDashboard from "./Component/AdminDashboard";
import ToDoList from "./Component/ToDoList";

const App = () => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  if (!token) {
    return <Auth setToken={setToken} />;
  }

  return (
    <ChakraProvider>
      <Box>
        <Button onClick={() => setIsAdmin(!isAdmin)}>Toggle Admin</Button>
        {isAdmin ? <AdminDashboard /> : <ToDoList />}
      </Box>
    </ChakraProvider>
  );
};

export default App;
