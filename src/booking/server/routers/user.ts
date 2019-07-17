/**
 * https://expressjs.com/zh-tw/guide/using-middleware.html
 */
import { Router } from 'express';
import {
  RegisterUser,
  RegisterUserOutputProps,
  RegisterUserInput
} from '../../usecase/user';
import IUserRepository from '../../usecase/user/i-repository';

export function createUserRoute(userRepo: IUserRepository): Router {
  const router = Router();

  router.get('/:id', function(req, res) {
    const id = req.params.id;
    res.send(id);
  });

  router.post('/register', function(req, res) {
    const { name, email, password, mobilePhone } = req.body;
    const input = new RegisterUserInput({
      name,
      email,
      password,
      mobilePhone
    });
    const usecase = new RegisterUser(userRepo);
    const output: RegisterUserOutputProps = usecase.execute(input);

    console.log(output);
    if (output.success) {
      res.redirect('/');
    } else {
      res.status(500).send(`register error: ${output.message}`);
    }
  });

  return router;
}
