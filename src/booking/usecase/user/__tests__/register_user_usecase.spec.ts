import IUserRepository from '../i-repository';
import { UserRepositoryInMem } from '../../../adapter/repository/user/repository';
import {
  RegisterUserUsecase,
  RegisterUserUsecaseInput,
  RegisterUserUsecaseOutput
} from '../register';
import bcrypt from '../../../infrastructure/bcrypt';

describe('Register a User', function() {
  it('register a user', function() {
    const repo: IUserRepository = new UserRepositoryInMem();
    const usecase: RegisterUserUsecase = new RegisterUserUsecase(repo, bcrypt);

    const name = 'abcd';
    const email = 'abcd@mail.com';
    const password = '123456';

    const input = new RegisterUserUsecaseInput({
      name,
      email,
      password
    });

    const output: RegisterUserUsecaseOutput = usecase.execute(input);

    expect(output.user.id).not.toBeNull();
    expect(output.user.password).not.toBeNull();
    expect(output.user.name).toBe(name);
    expect(output.user.email).toBe(email);
    expect(output.user.mobilePhone).toBe('');
  });
});
