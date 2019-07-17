/**
 * https://expressjs.com/zh-tw/guide/using-middleware.html
 */
import { Router } from 'express';
import {
  RegisterUser,
  RegisterUserOutputProps,
  RegisterUserInput
} from '../../usecase/user';
import { MemeryUserRepository } from '../repository/user/repository';
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
  const repo = new MemeryUserRepository();
  const usecase = new RegisterUser(repo);
  const output: RegisterUserOutputProps = usecase.execute(input);

  if (output.success) {
    res.redirect('/');
  } else {
    res.status(500).send(`register error: ${output.message}`);
  }
});

export default router;
