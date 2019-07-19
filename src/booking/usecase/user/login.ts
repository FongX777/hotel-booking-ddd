import { UserRepository } from '../../usecase/user/repository';
import { compare } from '../__utils/bcrypt';
import { sign } from '../__utils/jwt';

export class LoginUsecase {
  private readonly secret: string;
  private readonly userRepo: UserRepository;
  private _compare: (data: string, encrypted: string) => boolean;

  constructor(secret: string, userRepo: UserRepository) {
    this.secret = secret;
    this.userRepo = userRepo;
    this._compare = compare;
  }

  execute(input: LoginInput, output: LoginOutput): void {
    const { email, password } = input;

    const user = this.userRepo.findByEmail(email);
    if (user === undefined) {
      return;
    }

    const passwordMatched = compare(password, user.password);
    if (passwordMatched) {
      output.id = user.id.toValue();
      output.name = user.name;
      output.email = user.email;
      output.token = sign(this.secret, user.id.toValue(), user.email);
    } else {
      return;
    }
  }
}

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
};
