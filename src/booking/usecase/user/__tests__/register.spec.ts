import { RegisterUserUsecase } from '../index';
import { MemeryUserRepository } from '../../../adapter/repository/user';
import {
  UserPrensenter,
  UserPrensentModel
} from '../../../adapter/presenter/user';

describe('Register a User', function() {
  it('register a user', async function() {
    const repo = new MemeryUserRepository();
    const usecase = new RegisterUserUsecase(repo);
    const output = new UserPrensenter();

    const name = 'abcd';
    const email = 'abcd@mail.com';
    const password = '123456';

    const input = RegisterUserUsecase.createRequestModel(name, email, password);
    await usecase.execute(input, output);

    expect(output.success).toBeTruthy();
    expect(output.user).not.toBeUndefined();
    const user = output.user as UserPrensentModel;
    expect(user.name).toEqual(name);
    expect(user.email).toEqual(email);
  });
});
