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
    return new GetUserResp(id, name, email, mobilePhone);
  }

  execute(input: RequestModel, output: GetUserOutputPort): void {
    try {
      const { id } = input;
      const userId = new UserId(id);
      const user = this.userRepo.findById(userId);

      if (user === undefined) {
        output.notFound();
      } else {
        output.onFound(
          new GetUserResp(
            user.id.toString(),
            user.name,
            user.email,
            user.mobilePhone
          )
        );
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

export class GetUserResp {
  id: string;
  name: string | undefined;
  email: string | undefined;
  mobilePhone?: string;
  constructor(id: string, name: string, email: string, mobilePhone?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.mobilePhone = mobilePhone;
  }
}
