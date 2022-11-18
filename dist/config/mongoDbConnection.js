"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
class mongoDbConnect {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.connect();
    }
    connect() {
        mongoose_1.default.connect(`mongodb+srv://${this.username}:${this.password}@cluster0.gqybh.mongodb.net/?retryWrites=true&w=majority`);
        mongoose_1.default.connection.on("open", () => {
            console.log("Mongoose connection ready");
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.log(err.message);
        });
    }
}
module.exports = mongoDbConnect;
//# sourceMappingURL=mongoDbConnection.js.map