require("dotenv").config();
const express = require("express");
const { join } = require("path");
const server = require("./server");

server.use(express.static(join(__dirname, "client/build")));
server.get("*", function (req, res) {
  res.sendFile(join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("server corriendo en ", PORT);
});
