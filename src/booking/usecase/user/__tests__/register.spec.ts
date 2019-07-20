import {
  RegisterUserUsecase,
  RegisterUserInput,
  RegisterUserOutput
} from '../index';
import { MemeryUserRepository } from '../../../adapter/repository/user';

describe('Register a User', function() {
  it('should succeed', async function() {
    const name = 'abcd';
    const email = 'abcd@mail.com';
    const password = '123456';

    const input: RegisterUserInput = {
      name,
      email,
      password
    };
    const output: RegisterUserOutput = {};
    const repo = new MemeryUserRepository();
    const usecase = new RegisterUserUsecase(repo);

    usecase.execute(input, output);

    expect(output.id).not.toBeUndefined();
    expect(output.name).toBe(name);
    expect(output.email).toBe(email);
  });
});
