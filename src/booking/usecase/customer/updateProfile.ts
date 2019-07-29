import { CustomerId } from '../../domain/model/customer/customer';
import { CustomerRepository } from '../../usecase/customer/repository';
export class UpdateCustomerProfileUsecase {
  private readonly customerRepo: CustomerRepository;
  constructor(customerRepo: CustomerRepository) {
    this.customerRepo = customerRepo;
  }

  execute(input: UpdateProfileInput, output: UpdateProfileOutput) {
    const customerId = new CustomerId(input.id);
    const customer = this.customerRepo.findById(customerId);

    if (customer === undefined) {
      return;
    }

    customer.updateProfile({
      name: input.name,
      email: input.email,
      mobilePhone: input.mobilePhone
    });

    this.customerRepo.save(customer);

    output.id = customer.id.toValue();
    output.name = customer.name;
    output.email = customer.email;
    output.mobilePhone = customer.mobilePhone;
  }
}

export type UpdateProfileInput = {
  id: string;
  name: string;
  email: string;
  mobilePhone: string;
};

export class UpdateProfileOutput {
  id?: string;
  name?: string;
  email?: string;
  mobilePhone?: string;
}
