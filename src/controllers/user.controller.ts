import { Request, Response } from "express";
import User from "../models/user.mode";

class UserController {
  async register(req: Request, res: Response) {
    return res.send("hello");
  }
}

export = new UserController();
