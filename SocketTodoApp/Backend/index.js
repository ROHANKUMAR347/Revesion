const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.use(express.json());

const users = [];
const tasks = [];
let currentId = 1;

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ id: currentId++, username, password: hashedPassword });
  res.sendStatus(201);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use(authenticateToken);

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("Current tasks:", tasks);
  socket.emit("tasks", tasks);

  socket.on("addTask", (task) => {
    const newTask = { id: currentId++, ...task };
    tasks.push(newTask);
    console.log("Added task:", newTask);
    console.log("Updated tasks:", tasks);
    io.emit("tasks", tasks);
  });

  socket.on("updateTask", (updatedTask) => {
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      console.log("Updated task:", updatedTask);
      console.log("Updated tasks:", tasks);
      io.emit("tasks", tasks);
    }
  });

  socket.on("deleteTask", (taskId) => {
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      console.log("Deleted task:", taskId);
      console.log("Updated tasks:", tasks);
      io.emit("tasks", tasks);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => console.log("Server is running on port 4000"));
