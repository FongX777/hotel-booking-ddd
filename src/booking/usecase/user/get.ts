import { UserId } from '../../domain/model/user/user';
import { UserRepository } from './';

export class GetUserUsecase implements GetUserInputPort {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  static createRequestModel(id: string): RequestModel {
    return new RequestModel(id);
  }

  static createResponseModel(
    id: string,
    name: string,
    email: string,
    mobilePhone: string
  ): GetUserResp {
    return { id, name, email, mobilePhone };
  }

  execute(input: RequestModel, output: GetUserOutputPort): void {
    try {
      const { id } = input;
      const userId = new UserId(id);
      const user = this.userRepo.findById(userId);

      if (user === undefined) {
        output.notFound();
      } else {
        output.onFound({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          mobilePhone: user.mobilePhone
        });
      }
    } catch (error) {}
  }
}

export interface GetUserInputPort {
  execute(params: RequestModel, outputPort: GetUserOutputPort): void;
}

class RequestModel {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

export interface GetUserOutputPort {
  onFound: (respModel: GetUserResp) => void;
  notFound: () => void;
}

export type GetUserResp = {
  id: string;
  name?: string;
  email?: string;
  mobilePhone?: string;
};
