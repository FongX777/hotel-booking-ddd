/**
 * https://expressjs.com/zh-tw/guide/using-middleware.html
 */
import { Router } from 'express';
import { RegisterUserUsecase, RegisterUserInputPort } from '../../usecase/user';
import { UserRepository } from '../../usecase/user';
import { UserPrensenter } from '../../adapter/presenter/user';
import { UserController } from '../../adapter/controller/user';

export function createUserRoute(userRepo: UserRepository): Router {
  const router = Router();
  const userController = new UserController(userRepo);

  router.get('/:id', function(req, res) {
    const id = req.params.id;
    res.send(id);
  });

  router.post('/register', function(req, res) {
    const { name, email, password } = req.body;
    const dto = userController.register(name, email, password);
    if (dto.success) {
      res.redirect('/');
    } else {
      res.status(500).send(`register error`);
    }
  });

  return router;
}
