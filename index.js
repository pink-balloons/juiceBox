const PORT = 3000;
const express = require("express");
const server = express();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

app.use("/api", (req, res, next) => {
  console.log("A request was made to /api");
  next();
});

const apiRouter = require("./api");
server.use("/api", apiRouter);

app.get("/api", (req, res, next) => {
  console.log("A get request was made to /api");
  res.send({ message: "success" });
});

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

const { client } = require("./db");
client.connect();

server.listen(PORT, () => {
  // old stuff
});
