import mongoose from "mongoose";

class mongoDbConnect {
  private username: string;
  private password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.connect();
  }
  private connect() {
    mongoose.connect(
      `mongodb+srv://${this.username}:${this.password}@cluster0.gqybh.mongodb.net/?retryWrites=true&w=majority`
    );
    mongoose.connection.on("open", () => {
      console.log("Mongoose connection ready");
    });
    mongoose.connection.on("error", (err) => {
      console.log(err.message);
    });
  }
}
export = mongoDbConnect;
