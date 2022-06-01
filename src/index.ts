import express from "express";
import http from "http";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConnect from "./config/mongoDbConnection";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// connect database
const connectMongoDB = new dbConnect(
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || ""
);
connectMongoDB.connect();

//create server
const server = http.createServer(app);

//Midellware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import userApi from "./routes/v1/user.api";
import trackApi from "./routes/v1/track.api";
app.use("/v1/api/users", userApi);
app.use("/v1/api/tracks", trackApi);
server.listen(port, () => {
  console.log("server listening on port" + port);
});
