import {
  LoginUsecase,
  LoginInput,
  LoginOutput,
  RegisterCustomerUsecase,
  RegisterCustomerInput,
  RegisterCustomerOutput
} from '../index';
import { MemeryCustomerRepository } from '../../../adapter/repository/customer';

describe('Get a User', function() {
  let id: string;
  const name = 'abcd';
  const email = 'abcd@mail.com';
  const password = '123456';
  const repo = new MemeryCustomerRepository();

  beforeEach(async () => {
    const input: RegisterCustomerInput = {
      name,
      email,
      password
    };
    const output: RegisterCustomerOutput = {};
    const usecase = new RegisterCustomerUsecase(repo);
    await usecase.execute(input, output);
    id = output.id as string;
  });

  it('should login successfully', async function() {
    const usecase = new LoginUsecase('secret', repo);
    const input: LoginInput = { email, password };
    const output: LoginOutput = {};

    await usecase.execute(input, output);

    expect(output.id).toBe(id);
    expect(output.name).toBe(name);
    expect(output.email).toBe(email);
    expect(output.token).not.toBeUndefined();
  });
});
