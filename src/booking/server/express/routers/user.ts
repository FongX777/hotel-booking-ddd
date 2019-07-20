/**
 * https://expressjs.com/zh-tw/guide/using-middleware.html
 */
import { Router } from 'express';
import { UserRepository } from '../../../usecase/user';
import { UserController } from '../../../adapter/controller/user';

export function createUserRoute(userRepo: UserRepository): Router {
  const router = Router();
  const userController = new UserController(userRepo);

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(id);
  });

  router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const output = userController.register({ name, email, password });
    if (output.id) {
      res.redirect('/');
    } else {
      res.status(500).send(`register error`);
    }
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const output = userController.login({ email, password });
    if (output.token) {
      res.header('x-auth', output.token).send({
        id: output.id,
        name: output.name,
        email: output.email
      });
    } else {
      res.status(400).send();
    }
  });

  return router;
}

// //POST /users/login {email, passwrod}
// app.post('/users/login', (req, res) => {
//   var body = _.pick(req.body, ['email', 'password']);

//   User.findByCredentials(body.email, body.password)
//     .then(user => {
//       //res.send(user);
//       return user.generateAuthToken().then(token => {
//         res.header('x-auth', token).send(user);
//       });
//     })
//     .catch(e => {
//       res.status(400).send();
//     });
// });
