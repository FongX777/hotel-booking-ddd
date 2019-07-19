import {
  UpdateProfileUsecase,
  UpdateProfileInput,
  UpdateProfileOutput,
  RegisterUserUsecase
} from '../index';
import { MemeryUserRepository } from '../../../adapter/repository/user';
import { UserPrensenter } from '../../../adapter/presenter/user';

describe('Update profile', function() {
  let id: string;
  const repo = new MemeryUserRepository();
  beforeEach(async () => {
    const usecase: RegisterUserUsecase = new RegisterUserUsecase(repo);
    const output = new UserPrensenter();

    const name = 'abcd';
    const email = 'abcd@mail.com';
    const password = '123456';

    const input = RegisterUserUsecase.createRequestModel(name, email, password);
    await usecase.execute(input, output);
    if (output.user) {
      id = output.user.id as string;
    }
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
