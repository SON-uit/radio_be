"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv = __importStar(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const redis_1 = __importDefault(require("redis"));
if (process.env.REDIS_PORT) {
    const redisClient = redis_1.default.createClient();
}
const mongoDbConnection_1 = __importDefault(require("./config/mongoDbConnection"));
const errorHandler_controller_1 = __importDefault(require("./controllers/errorHandler.controller"));
dotenv.config({ path: "./.env" });
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// connect database
const connectMongoDB = new mongoDbConnection_1.default(process.env.DB_USER || "", process.env.DB_PASSWORD || "");
//create server
const server = http_1.default.createServer(app);
//Midellware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "radionsecretsessionkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000 * 24 * 3,
        secure: false,
        httpOnly: true
    }
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
//automation
/* import { rankingJob } from "./feature/rankingAuto";
rankingJob.start(); */
const users_api_1 = __importDefault(require("./routes/v1/users.api"));
const tracks_api_1 = __importDefault(require("./routes/v1/tracks.api"));
const singers_api_1 = __importDefault(require("./routes/v1/singers.api"));
const album_api_1 = __importDefault(require("./routes/v1/album.api"));
const ranking_api_1 = __importDefault(require("./routes/v1/ranking.api"));
app.use("/v1/api/users", users_api_1.default);
app.use("/v1/api/tracks", tracks_api_1.default);
app.use("/v1/api/singers", singers_api_1.default);
app.use("/v1/api/albums", album_api_1.default);
app.use("/v1/api/ranks", ranking_api_1.default);
//Error hanler Middelware
app.use(errorHandler_controller_1.default);
server.listen(port, () => {
    console.log("server listening on port" + port);
});
//# sourceMappingURL=index.js.map