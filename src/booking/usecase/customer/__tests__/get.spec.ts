import {
  GetCustomerUsecase,
  GetCustomerInput,
  GetCustomerOutput,
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

  it('should get a user just registered', async function() {
    const usecase = new GetCustomerUsecase(repo);
    const input: GetCustomerInput = { id };
    const output: GetCustomerOutput = {};

    await usecase.execute(input, output);

    expect(output).toEqual({
      id,
      name,
      email,
      mobilePhone: ''
    });
  });
});
