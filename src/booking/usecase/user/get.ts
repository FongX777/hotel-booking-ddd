import { UserId } from '../../domain/model/user/user';
import { UserRepository } from './';

export class GetUserUsecase implements GetUserInputPort {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  static createRequestModel(id: string): GetUserInput {
    return { id };
  }

  static createResponseModel(
    id: string,
    name: string,
    email: string,
    mobilePhone: string
  ): GetUserOutput {
    return { id, name, email, mobilePhone };
  }

  execute(input: GetUserInput, output: GetUserOutputPort): void {
    try {
      const { id } = input;
      const userId = new UserId(id);
      const user = this.userRepo.findById(userId);

      if (user === undefined) {
        output.notFound('User Not Exist');
      } else {
        output.onFound({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          mobilePhone: user.mobilePhone
        });
      }
    } catch (error) {
      console.error(error);
      output.notFound(error.message);
    }
  }
}

export interface GetUserInputPort {
  execute(params: GetUserInput, outputPort: GetUserOutputPort): void;
}

type GetUserInput = {
  id: string;
};

export interface GetUserOutputPort {
  onFound: (respModel: GetUserOutput) => void;
  notFound: (reason: string) => void;
}

export type GetUserOutput = {
  id: string;
  name?: string;
  email?: string;
  mobilePhone?: string;
};
