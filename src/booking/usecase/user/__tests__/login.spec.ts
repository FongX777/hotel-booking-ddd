import {
  LoginUsecase,
  LoginInput,
  LoginOutput,
  RegisterUserUsecase,
  RegisterUserInput,
  RegisterUserOutput
} from '../index';
import { MemeryUserRepository } from '../../../adapter/repository/user';

describe('Get a User', function() {
  let id: string;
  const name = 'abcd';
  const email = 'abcd@mail.com';
  const password = '123456';
  const repo = new MemeryUserRepository();

  beforeEach(async () => {
    const input: RegisterUserInput = {
      name,
      email,
      password
    };
    const output: RegisterUserOutput = {};
    const usecase = new RegisterUserUsecase(repo);
    await usecase.execute(input, output);
    id = output.id as string;
  });

  it('should login successfully', async function() {
    const usecase = new LoginUsecase(repo);
    const input: LoginInput = { email, password };
    const output: LoginOutput = {};

    await usecase.execute(input, output);

    expect(output).toEqual({
      id,
      name,
      email
    });
  });
});
