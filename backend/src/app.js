import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import Youch from 'youch';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const error = await new Youch(err, req).toJSON();

      return res.status(500).json(error);
    });
  }
}

export default new App().server;
