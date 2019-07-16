import { User, UserId } from '../../domain/user/user';
import IUserRepository from './i-repository';
import IBcrypt from '../infrastructure/i-bcrypt';

export class RegisterUserUsecase {
  private userRepo: IUserRepository;
  private bcrypt: IBcrypt;

  constructor(userRepo: IUserRepository, bcrypt: IBcrypt) {
    this.userRepo = userRepo;
    this.bcrypt = bcrypt;
  }

  execute(input: RegisterUserUsecaseInput): RegisterUserUsecaseOutput {
    const id: UserId = this.userRepo.newId();
    const { name, email, password, mobilePhone } = input;

    const hashedPassword = this.bcrypt.encrypt(password);

    const user = User.register({
      id,
      name,
      email,
      password: hashedPassword,
      mobilePhone
    });
    this.userRepo.save(user);

    const output = new RegisterUserUsecaseOutput(user);
    return output;
  }
}

export class RegisterUserUsecaseInput {
  name: string;
  email: string;
  password: string;
  mobilePhone?: string;

  constructor({
    name,
    email,
    password,
    mobilePhone
  }: {
    name: string;
    email: string;
    password: string;
    mobilePhone?: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.mobilePhone = mobilePhone;
  }
}

export class RegisterUserUsecaseOutput {
  user: User;
  constructor(user: User) {
    this.user = user;
  }
}
