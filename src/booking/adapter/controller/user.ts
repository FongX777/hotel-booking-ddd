import { UserRepository } from '../../usecase/user';
import {
  RegisterUserUsecase,
  RegisterUserInputPort
} from '../../usecase/user/register';
import { UserPrensenter } from '../presenter/user';
export class UserController {
  userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }
  register(name: string, email: string, password: string) {
    const requestModel = RegisterUserUsecase.createRequestModel(
      name,
      email,
      password
    );
    const usecase: RegisterUserInputPort = new RegisterUserUsecase(
      this.userRepo
    );
    const output = new UserPrensenter();
    usecase.execute(requestModel, output);
    return { success: true };
  }
}
