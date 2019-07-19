import { GetUserUsecase, RegisterUserUsecase } from '../index';
import { MemeryUserRepository } from '../../../adapter/repository/user';
import { UserPrensenter } from '../../../adapter/presenter/user';

describe('Register a User', function() {
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

  it('register a user', async function() {
    const usecase = new GetUserUsecase(repo);
    const output = new UserPrensenter();

    const input = GetUserUsecase.createRequestModel(id);

    await usecase.execute(input, output);

    expect(output.success).toBeTruthy();
  });
});
