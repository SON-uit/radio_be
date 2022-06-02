import express from "express";
import http from "http";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dbConnect from "./config/mongoDbConnection";
import errorHandler from "./controllers/errorHandler.controller";
dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3000;

// connect database
const connectMongoDB = new dbConnect(process.env.DB_USER || "", process.env.DB_PASSWORD || "");
connectMongoDB.connect();

//create server
const server = http.createServer(app);

//Midellware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
import userApi from "./routes/v1/users.api";
import trackApi from "./routes/v1/tracks.api";
import singerApi from "./routes/v1/singers.api";
app.use("/v1/api/users", userApi);
app.use("/v1/api/tracks", trackApi);
app.use("/v1/api/singers", singerApi);

//Error hanler Middelware
app.use(errorHandler);
server.listen(port, () => {
  console.log("server listening on port" + port);
});
