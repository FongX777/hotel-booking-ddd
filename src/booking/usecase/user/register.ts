import { User, UserId } from '../../domain/model/user/user';
import { UserRepository } from './';
import { encrypt } from '../__utils/bcrypt';

export class RegisterUserUsecase implements RegisterUserInputPort {
  private userRepo: UserRepository;
  private _encrypt: (data: string) => string;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
    this._encrypt = encrypt;
  }

  static createRequestModel(
    name: string,
    email: string,
    password: string
  ): RegisterUserReqModel {
    return new RegisterUserReqModel(name, email, password);
  }

  execute(input: RegisterUserReqModel, output: RegisterUserOutputPort): void {
    try {
      const id: UserId = this.userRepo.nextId();
      const { name, email, password } = input;

      const hashedPassword = this._encrypt(password);

      const user = User.register({
        id,
        name,
        email,
        password: hashedPassword
      });
      this.userRepo.save(user);
      output.onRegistered(
        new RegisterUserRespModel(user.id.toValue(), user.name, user.email)
      );
    } catch (error) {}
  }

  /** for testing usage */
  stubEncrypt(_encrypt: (data: string) => string) {
    this._encrypt = _encrypt;
  }
}

export interface RegisterUserInputPort {
  execute(
    params: RegisterUserReqModel,
    outputPort: RegisterUserOutputPort
  ): void;
}

class RegisterUserReqModel {
  name: string;
  email: string;
  password: string;
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export interface RegisterUserOutputPort {
  onRegistered: (responseModel: RegisterUserRespModel) => void;
}

export class RegisterUserRespModel {
  id: string;
  name: string;
  email: string;
  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
