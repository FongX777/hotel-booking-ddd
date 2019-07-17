import { User, UserId } from '../../domain/model/user/user';
import IUserRepository from './i-repository';
import { encrypt } from '../__utils/bcrypt';

export class RegisterUser {
  private userRepo: IUserRepository;
  private _encrypt: (data: string) => string;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
    this._encrypt = encrypt;
  }

  /** for testing usage */
  stubEncrypt(_encrypt: (data: string) => string) {
    this._encrypt = _encrypt;
  }

  execute(input: RegisterUserInput): RegisterUserUsecaseOutput {
    try {
      const id: UserId = this.userRepo.nextId();
      const { name, email, password, mobilePhone } = input;

      const hashedPassword = this._encrypt(password);

      const user = User.register({
        id,
        name,
        email,
        password: hashedPassword,
        mobilePhone
      });
      this.userRepo.save(user);
      const output = RegisterUserUsecaseOutput.succeed(user);
      return output;
    } catch (error) {
      const output = RegisterUserUsecaseOutput.fail(error.message);
      return output;
    }
  }
}

interface RegisterUserInputProps {
  name: string;
  email: string;
  password: string;
  mobilePhone?: string;
}

export class RegisterUserInput implements RegisterUserInputProps {
  name: string;
  email: string;
  password: string;
  mobilePhone?: string;

  constructor(props: RegisterUserInputProps) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.mobilePhone = props.mobilePhone;
  }
}

export interface RegisterUserOutputProps {
  user: User | null;
  success: boolean;
  message: string;
}

export class RegisterUserUsecaseOutput implements RegisterUserOutputProps {
  user: User | null;
  success: boolean;
  message: string;
  constructor(props: RegisterUserUsecaseOutput) {
    this.user = props.user;
    this.success = props.success;
    this.message = props.message;
  }

  static succeed(user: User): RegisterUserUsecaseOutput {
    return new RegisterUserUsecaseOutput({
      user,
      success: true,
      message: 'ok'
    });
  }

  static fail(message: string): RegisterUserUsecaseOutput {
    return new RegisterUserUsecaseOutput({
      user: null,
      success: false,
      message
    });
  }
}
