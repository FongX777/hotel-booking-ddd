import { Customer, CustomerId } from '../model/customer/customer';
export class CustomerIdentityService {
  private _encrypt: (text: string) => string;
  constructor(_encrypt: (text: string) => string) {
    this._encrypt = _encrypt;
  }

  registerCustomer(params: {
    id: CustomerId;
    name: string;
    email: string;
    plainTextPassword: string;
  }) {
    const hashedPassword = this._encrypt(params.plainTextPassword);
    const customer = new Customer({
      id: params.id,
      name: params.name,
      email: params.email,
      password: hashedPassword,
      mobilePhone: ''
    });
    return customer;
  }
}
