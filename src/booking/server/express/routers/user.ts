/**
 * https://expressjs.com/zh-tw/guide/using-middleware.html
 */
import { Router } from 'express';
import { UserRepository } from '../../../usecase/user';
import { UserController } from '../../../adapter/controller/user';

export function createUserRoute(userRepo: UserRepository): Router {
  const router = Router();
  const userController = new UserController(userRepo);

  router.get('/:id', function(req, res) {
    const id = req.params.id;
    res.send(id);
  });

  router.post('/register', function(req, res) {
    const { name, email, password } = req.body;
    const output = userController.register({ name, email, password });
    if (output.id) {
      res.redirect('/');
    } else {
      res.status(500).send(`register error`);
    }
  });

  return router;
}
