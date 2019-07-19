import {
  UpdateProfileUsecase,
  UpdateProfileInput,
  UpdateProfileOutput,
  RegisterUserUsecase,
  RegisterUserInput,
  RegisterUserOutput
} from '../index';
import { MemeryUserRepository } from '../../../adapter/repository/user';

describe('Update profile', function() {
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

    const usecase = new UpdateProfileUsecase(repo);

    usecase.execute(input, output);

    console.log(output);
    expect(output.name).toBe(newName);
    expect(output.email).toBe(newEmail);
    expect(output.mobilePhone).toBe(newMobilePhone);
  });
});
