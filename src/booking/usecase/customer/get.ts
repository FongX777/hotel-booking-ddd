import { CustomerId } from '../../domain/model/customer/customer';
import { CustomerRepository } from './';

export class GetCustomerUsecase {
  constructor(private readonly customerRepo: CustomerRepository) {
    this.customerRepo = customerRepo;
  }

  static createResponseModel(
    id: string,
    name: string,
    email: string,
    mobilePhone: string
  ): GetCustomerOutput {
    return { id, name, email, mobilePhone };
  }

  execute(input: GetCustomerInput, output: GetCustomerOutput): void {
    const { id } = input;
    const customerId = new CustomerId(id);
    const customer = this.customerRepo.findById(customerId);

    if (customer === undefined) {
      return;
    } else {
      output.id = customer.id.toValue();
      output.name = customer.name;
      output.email = customer.email;
      output.mobilePhone = customer.mobilePhone;
    }
  }
}

export type GetCustomerInput = { id: string };

export type GetCustomerOutput = {
  id?: string;
  name?: string;
  email?: string;
  mobilePhone?: string;
};
