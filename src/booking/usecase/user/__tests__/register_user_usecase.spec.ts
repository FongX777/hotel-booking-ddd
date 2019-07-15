import { IUserRepository } from '../i_repository';
import { UserRepositoryInMem } from '../../../infrastructure/repository/user/repository';
import { RegisterUserUsecase } from '../register_user_usecase';
import { RegisterUserUsecaseInput } from '../register_user_usecase_input';
import { RegisterUserUsecaseOutput } from '../register_user_usecase_output';

describe('Register a User', function() {
  it('register a user', function() {
    const repo: IUserRepository = new UserRepositoryInMem();
    const usecase: RegisterUserUsecase = new RegisterUserUsecase(repo);

    const input = new RegisterUserUsecaseInput({
      name: 'abcd',
      email: 'abcd@mail.com',
      password: '12345'
    });
    const output = new RegisterUserUsecaseOutput();

    usecase.execute(input, output);

    expect(output.user).not.toBeNull();
  });
});
