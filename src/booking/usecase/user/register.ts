import { User, UserId } from '../../domain/model/user/user';
import { UserRepository } from './';
import { encrypt } from '../__utils/bcrypt';

export class RegisterUserUsecase {
  private userRepo: UserRepository;
  private _encrypt: (data: string) => string;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
    this._encrypt = encrypt;
  }

  execute(input: RegisterUserInput, output: RegisterUserOutput): void {
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

    output.id = user.id.toValue();
    output.name = user.name;
    output.email = user.email;
  }

  /** for testing usage */
  stubEncrypt(_encrypt: (data: string) => string) {
    this._encrypt = _encrypt;
  }
}

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserOutput = {
  id?: string;
  name?: string;
  email?: string;
};
