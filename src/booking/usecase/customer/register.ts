import { Customer, CustomerId } from '../../domain/model/customer/customer';
import { CustomerRepository } from './';
import { encrypt } from '../__utils/bcrypt';

export class RegisterCustomerUsecase {
  private customerRepo: CustomerRepository;
  private _encrypt: (data: string) => string;

  constructor(customerRepo: CustomerRepository) {
    this.customerRepo = customerRepo;
    this._encrypt = encrypt;
  }

  execute(input: RegisterCustomerInput, output: RegisterCustomerOutput): void {
    const id: CustomerId = this.customerRepo.nextId();
    const { name, email, password } = input;

    const hashedPassword = this._encrypt(password);

    const customer = Customer.register({
      id,
      name,
      email,
      password: hashedPassword
    });
    this.customerRepo.save(customer);

    output.id = customer.id.toValue();
    output.name = customer.name;
    output.email = customer.email;
  }

  /** for testing usage */
  stubEncrypt(_encrypt: (data: string) => string) {
    this._encrypt = _encrypt;
  }
}

export type RegisterCustomerInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterCustomerOutput = {
  id?: string;
  name?: string;
  email?: string;
};
