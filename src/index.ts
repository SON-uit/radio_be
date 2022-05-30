import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';

import dbConnect from './config/mongoDbConnection';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// connect database
const connectMongoDB = new dbConnect(
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || ''
);
connectMongoDB.connect();
const server = http.createServer(app);

import userApi from './routes/v1/user.api';
app.use('/v1/api/users', userApi);

server.listen(port, () => {
  console.log('server listening on port' + port);
});
