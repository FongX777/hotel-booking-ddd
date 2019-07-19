import dotenv from 'dotenv';
import { MemeryUserRepository } from '../adapter/repository/user/index';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config();
}

// import { createExpressServerApp, ExpressApp } from './express/app';
import { createGraphqlServerApp } from './graphql/server';

const config = { port: Number(process.env.PORT) };

if (process.env.NODE_ENV === 'dev') {
  const repos = {
    user: new MemeryUserRepository()
  };
  const app = createGraphqlServerApp(config, repos);
  app.start();
} else if (process.env.NODE_ENV === 'production') {
}
