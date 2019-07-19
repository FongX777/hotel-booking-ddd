import { UserRepository } from '../../usecase/user';
import {
  RegisterUserUsecase,
  RegisterUserInputPort,
  RegisterUserOutputPort
} from '../../usecase/user/register';
export class UserController {
  private userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }
  register(req: RegisterReq, output: RegisterUserOutputPort) {
    const requestModel = RegisterUserUsecase.createRequestModel(
      req.name,
      req.email,
      req.password
    );
    const usecase: RegisterUserInputPort = new RegisterUserUsecase(
      this.userRepo
    );
    usecase.execute(requestModel, output);
  }
}

type RegisterReq = {
  name: string;
  email: string;
  password: string;
};
