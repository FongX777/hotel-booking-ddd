import { User } from '../../../domain/user/user';
import IUserRepository from '../i-repository';
import { MemeryUserRepository } from '../../../adapter/repository/user/repository';
import {
  RegisterUserUsecase,
  RegisterUserUsecaseInput,
  RegisterUserUsecaseOutput
} from '../register';

describe('Register a User', function() {
  it('register a user', function() {
    const repo: IUserRepository = new MemeryUserRepository();
    const usecase: RegisterUserUsecase = new RegisterUserUsecase(repo);

    const name = 'abcd';
    const email = 'abcd@mail.com';
    const password = '123456';

    const input = new RegisterUserUsecaseInput({
      name,
      email,
      password
    });

    const output: RegisterUserUsecaseOutput = usecase.execute(input);

    expect(output.success).toBeTruthy();
    expect(output.user).not.toBeNull();

    const user = output.user as User;
    expect(user.password).not.toBeNull();
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.mobilePhone).toBe('');
  });
});
