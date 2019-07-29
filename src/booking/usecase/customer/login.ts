import { CustomerRepository } from '../../usecase/customer/repository';
import { compare } from '../__utils/bcrypt';
import { sign } from '../__utils/jwt';

export class LoginUsecase {
  private readonly secret: string;
  private readonly customerRepo: CustomerRepository;
  private _compare: (data: string, encrypted: string) => boolean;

  constructor(secret: string, customerRepo: CustomerRepository) {
    this.secret = secret;
    this.customerRepo = customerRepo;
    this._compare = compare;
  }

  execute(input: LoginInput, output: LoginOutput): void {
    const { email, password } = input;

    const customer = this.customerRepo.findByEmail(email);
    if (customer === undefined) {
      return;
    }

    const passwordMatched = this._compare(password, customer.password);
    if (passwordMatched) {
      output.id = customer.id.toValue();
      output.name = customer.name;
      output.email = customer.email;
      output.token = sign(this.secret, customer.id.toValue(), customer.email);
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
