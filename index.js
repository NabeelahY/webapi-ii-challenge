const express = require("express");
const postRoutes = require("./posts/posts-routes");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/posts", postRoutes);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome to my API</h1>`);
});

server.listen(5000, () => {
  console.log("listening on 5000");
});
