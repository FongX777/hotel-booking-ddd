import dotenv from 'dotenv';
import { MemeryUserRepository } from '../adapter/repository/user/index';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config();
}

import { createExpressServerApp, Config, ExpressApp } from './app';

const config = { port: Number(process.env.PORT) };

if (process.env.NODE_ENV === 'dev') {
  const repos = {
    user: new MemeryUserRepository()
  };
  const app: ExpressApp = createExpressServerApp(config, repos);
  app.start();
} else if (process.env.NODE_ENV === 'production') {
}
