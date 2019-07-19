import {
  GetUserUsecase,
  GetUserInput,
  GetUserOutput,
  RegisterUserUsecase,
  RegisterUserInput,
  RegisterUserOutput
} from '../index';
import { MemeryUserRepository } from '../../../adapter/repository/user';
import { UserPrensenter } from '../../../adapter/presenter/user';

describe('Get a User', function() {
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
    await usecase.execute(input, output);
    id = output.id as string;
  });

  it('should get a user just registered', async function() {
    const usecase = new GetUserUsecase(repo);
    const input: GetUserInput = { id };
    const output: GetUserOutput = {};

    await usecase.execute(input, output);

    expect(output).toEqual({
      id,
      name,
      email,
      mobilePhone: ''
    });
  });
});
