import { RegisterUserUsecase, ResponseModel } from '../index';
import { MemeryUserRepository } from '../../../adapter/repository/user';
import { UserPrensenter } from '../../../adapter/presenter/user';

describe('Register a User', function() {
  it('register a user', async function() {
    const repo = new MemeryUserRepository();
    const usecase: RegisterUserUsecase = new RegisterUserUsecase(repo);
    const output = new UserPrensenter();

    const name = 'abcd';
    const email = 'abcd@mail.com';
    const password = '123456';

    const input = RegisterUserUsecase.createRequestModel(name, email, password);
    await usecase.execute(input, output);

    expect(output.responseModel).not.toBeUndefined();
    const responseModel = output.responseModel as ResponseModel;
    expect(responseModel.name).toBe(name);
    expect(responseModel.email).toBe(email);
  });
});
