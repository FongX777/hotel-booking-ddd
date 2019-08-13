import { CustomerIdentityService } from '../../domain/service/customer-identity-service';
import { CustomerRepository } from '../../domain/model/customer/repository';
import { encrypt } from '../__utils/bcrypt';

export class RegisterCustomerUsecase {
  private customerRepo: CustomerRepository;
  private _encrypt: (data: string) => string;

  constructor(customerRepo: CustomerRepository) {
    this.customerRepo = customerRepo;
    this._encrypt = encrypt;
  }

  execute(input: RegisterCustomerInput, output: RegisterCustomerOutput): void {
    const { name, email, password } = input;

    const service = new CustomerIdentityService(this._encrypt);
    const customer = service.registerCustomer({
      id: this.customerRepo.nextId(),
      name,
      email,
      plainTextPassword: password
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
