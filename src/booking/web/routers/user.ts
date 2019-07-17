/**
 * https://expressjs.com/zh-tw/guide/using-middleware.html
 */
import { Router } from 'express';
import {
  RegisterUserUsecase,
  RegisterUserUsecaseOutputProps,
  RegisterUserUsecaseInput
} from '../../usecase/user';
import { MemeryUserRepository } from '../../adapter/repository/user/repository';
const router = Router();

router.get('/:id', function(req, res) {
  const id = req.params.id;
  res.send(id);
});

router.post('/register', function(req, res) {
  const { name, email, password, mobilePhone } = req.body;
  const input = new RegisterUserUsecaseInput({
    name,
    email,
    password,
    mobilePhone
  });
  const repo = new MemeryUserRepository();
  const usecase = new RegisterUserUsecase(repo);
  const output: RegisterUserUsecaseOutputProps = usecase.execute(input);

  if (output.success) {
    res.redirect('/');
  } else {
    res.status(500).send(`register error: ${output.message}`);
  }
});

export default router;
