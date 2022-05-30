import { Request, Response } from 'express';
import User from '../models/user.mode';

class userController {
  async register(req: Request, res: Response) {
    return res.send('hello');
  }
}

export = new userController();
