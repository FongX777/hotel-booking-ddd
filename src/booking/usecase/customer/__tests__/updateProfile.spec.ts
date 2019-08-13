import {
  UpdateCustomerProfileUsecase,
  UpdateProfileInput,
  UpdateProfileOutput,
  RegisterCustomerUsecase,
  RegisterCustomerInput,
  RegisterCustomerOutput
} from '../index';
import { MemeryCustomerRepository } from '../../../adapter/repository/customer';

describe('Update profile', function() {
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
    usecase.execute(input, output);
    id = output.id as string;
  });

  it('should succeed', function() {
    const output = new UpdateProfileOutput();

    const newName = 'fong';
    const newEmail = 'yy@mail.com';
    const newMobilePhone = '0912121212';

    const input: UpdateProfileInput = {
      id,
      name: newName,
      email: newEmail,
      mobilePhone: newMobilePhone
    };

    const usecase = new UpdateCustomerProfileUsecase(repo);

    usecase.execute(input, output);

    expect(output.name).toBe(newName);
    expect(output.email).toBe(newEmail);
    expect(output.mobilePhone).toBe(newMobilePhone);
  });
});
