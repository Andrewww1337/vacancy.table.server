import 'dotenv/config';
import express, { Application } from 'express';

import cors from 'cors';
import { PORT, DB_URL } from './config';
import { UserRouter } from './routes/user-routes';
import mongoose from 'mongoose';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/user', UserRouter);

const startServer = (appObj: Application, serverPort: string) => {
  appObj.listen(serverPort, () => {
    console.log(`Table app listening on port ${serverPort}`);
  });
};

const start = (appObj: Application, serverPort: string, dbURL: string) => {
  mongoose
    .connect(dbURL)
    .then(() => {
      console.log('Connected to MongoDB');
      startServer(appObj, serverPort);
    })
    .catch((error) => {
      console.log(`DB connetction error: ${error}`);
    });
};

start(app, PORT, DB_URL);
