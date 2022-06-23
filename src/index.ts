import express from "express";
import http from "http";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import redis from "redis";
if (process.env.REDIS_PORT) {
  const redisClient = redis.createClient();
}
import dbConnect from "./config/mongoDbConnection";
import errorHandler from "./controllers/errorHandler.controller";
import * as interfaceTypes from "./types/types.interface";
dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3000;

// connect database
const connectMongoDB = new dbConnect(process.env.DB_USER || "", process.env.DB_PASSWORD || "");

//create server
const server = http.createServer(app);

//Midellware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
declare module "express-session" {
  interface SessionData {
    user: interfaceTypes.IUser;
  }
}
app.use(
  session({
    secret: "radionsecretsessionkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24 * 3, // 3days
      secure: false,
      httpOnly: true
    }
  })
);
app.use(morgan("dev"));
app.use(cors());
//automation
import { rankingJob } from "./feature/rankingAuto";
rankingJob.start();
import userApi from "./routes/v1/users.api";
import trackApi from "./routes/v1/tracks.api";
import singerApi from "./routes/v1/singers.api";
import albumApi from "./routes/v1/album.api";
import rankApi from "./routes/v1/ranking.api";
app.use("/v1/api/users", userApi);
app.use("/v1/api/tracks", trackApi);
app.use("/v1/api/singers", singerApi);
app.use("/v1/api/albums", albumApi);
app.use("/v1/api/ranks", rankApi);
//Error hanler Middelware
app.use(errorHandler);
server.listen(port, () => {
  console.log("server listening on port" + port);
});
