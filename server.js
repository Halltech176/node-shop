const http = require("http");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 5000;

const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("Database connected successfully");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
