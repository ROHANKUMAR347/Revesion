const express = require("express");
const { connectToDB } = require("./config/db");

const authrouter = require("./Routes/authRoutes");
const countryRouter = require("./Routes/countryRoutes");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", authrouter);
app.use("/api", countryRouter);

app.listen(PORT, async () => {
  try {
    await connectToDB();
    console.log(`server is running on port ${PORT}`);
  } catch {
    console.log(err);
  }
});
