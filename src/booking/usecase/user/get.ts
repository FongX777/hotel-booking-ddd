import { UserId } from '../../domain/model/user/user';
import { UserRepository } from './';

export class GetUserUsecase {
  constructor(private readonly userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  static createResponseModel(
    id: string,
    name: string,
    email: string,
    mobilePhone: string
  ): GetUserOutput {
    return { id, name, email, mobilePhone };
  }

  execute(input: GetUserInput, output: GetUserOutput): void {
    const { id } = input;
    const userId = new UserId(id);
    const user = this.userRepo.findById(userId);

    if (user === undefined) {
      return;
    } else {
      output.id = user.id.toValue();
      output.name = user.name;
      output.email = user.email;
      output.mobilePhone = user.mobilePhone;
    }
  }
}

export type GetUserInput = { id: string };

export type GetUserOutput = {
  id?: string;
  name?: string;
  email?: string;
  mobilePhone?: string;
};
