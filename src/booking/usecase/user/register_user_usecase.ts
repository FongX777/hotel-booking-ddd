import { RegisterUserUsecaseInput } from './register_user_usecase_input';
import { RegisterUserUsecaseOutput } from './register_user_usecase_output';
import { User, UserId } from '../../domain/user/user';
import { IUserRepository } from './i_repository';

export class RegisterUserUsecase {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  execute(input: RegisterUserUsecaseInput, output: RegisterUserUsecaseOutput) {
    const id: UserId = this.userRepo.newId();

    // TODO: hash the password;

    const user = User.register({
      id,
      name: input.name,
      email: input.email,
      password: input.password,
      mobilePhone: input.mobilePhone
    });
    this.userRepo.save(user);
    output.setUser(user);
  }
}
