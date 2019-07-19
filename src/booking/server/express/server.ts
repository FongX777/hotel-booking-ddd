// lib/app.ts
import express from 'express';
import bodyParser from 'body-parser';

import { createUserRoute } from './routers/user';
import { UserRepository } from '../../usecase/user';

export interface Config {
  port: number;
}

export interface ExpressApp {
  start: () => void;
}

export interface Repositories {
  user: UserRepository;
}

export function createExpressServerApp(
  config: Config,
  repos: Repositories
): ExpressApp {
  const app: express.Application = express();

  app.use(bodyParser.json());
  app.use('/user', createUserRoute(repos.user));

  app.get('/', function(req, res) {
    res.send('Hello World!');
  });

  const expressApp: ExpressApp = {
    start: () =>
      app.listen(config.port, () => {
        console.log('Example app listening on port 3000!');
      })
  };
  return expressApp;
}
