import { UserRepository } from '../../usecase/user';
import {
  RegisterUserUsecase,
  RegisterUserInput,
  RegisterUserOutput,
  LoginUsecase,
  LoginInput,
  LoginOutput
} from '../../usecase/user/';
export class UserController {
  private userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  register(req: RegisterReq): RegisterResp {
    const input: RegisterUserInput = {
      name: req.name,
      email: req.email,
      password: req.password
    };

    const output: RegisterUserOutput = {};
    const usecase = new RegisterUserUsecase(this.userRepo);
    usecase.execute(input, output);

    return {
      id: output.id as string,
      name: output.name as string,
      email: output.email as string
    };
  }

  login(req: LoginReq): LoginResp {
    const input: LoginInput = {
      email: req.email,
      password: req.password
    };
    const output: LoginOutput = {};

    const usecase = new LoginUsecase('', this.userRepo);
    usecase.execute(input, output);
    return {
      token: output.token as string,
      id: output.id as string,
      name: output.name as string,
      email: output.email as string
    };
  }
}

type LoginReq = {
  email: string;
  password: string;
};
type LoginResp = {
  token: string;
  id: string;
  name: string;
  email: string;
};

type RegisterReq = {
  name: string;
  email: string;
  password: string;
};

type RegisterResp = {
  id: string;
  name: string;
  email: string;
};
