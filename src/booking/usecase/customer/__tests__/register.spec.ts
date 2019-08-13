import {
  RegisterCustomerUsecase,
  RegisterCustomerInput,
  RegisterCustomerOutput
} from '../index';
import { MemeryCustomerRepository } from '../../../adapter/repository/customer';

describe('Register a User', function() {
  it('should succeed', async function() {
    const name = 'abcd';
    const email = 'abcd@mail.com';
    const password = '123456';

    const input: RegisterCustomerInput = {
      name,
      email,
      password
    };
    const output: RegisterCustomerOutput = {};
    const repo = new MemeryCustomerRepository();
    const usecase = new RegisterCustomerUsecase(repo);

    usecase.execute(input, output);

    expect(output.id).not.toBeUndefined();
    expect(output.name).toBe(name);
    expect(output.email).toBe(email);
    expect(repo.customers.length).toBe(1);
  });
});
