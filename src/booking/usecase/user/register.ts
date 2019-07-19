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
  ): RegisterUserInput {
    return { name, email, password };
  }

  execute(input: RegisterUserInput, output: RegisterUserOutputPort): void {
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
      output.onRegistered({
        id: user.id.toValue(),
        name: user.name,
        email: user.email
      });
    } catch (error) {}
  }

  /** for testing usage */
  stubEncrypt(_encrypt: (data: string) => string) {
    this._encrypt = _encrypt;
  }
}

export interface RegisterUserInputPort {
  execute(params: RegisterUserInput, outputPort: RegisterUserOutputPort): void;
}

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

export interface RegisterUserOutputPort {
  onRegistered: (responseModel: RegisterUserOutput) => void;
}

export type RegisterUserOutput = {
  id: string;
  name: string;
  email: string;
};
