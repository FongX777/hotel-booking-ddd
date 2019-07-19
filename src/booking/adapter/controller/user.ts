import { UserRepository } from '../../usecase/user';
import {
  RegisterUserUsecase,
  RegisterUserInput,
  RegisterUserOutput
} from '../../usecase/user/register';
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
}

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
