import { CustomerRepository } from '../../../domain/model/customer/repository';
import { Customer, CustomerId } from '../../../domain/model/customer/customer';
import { generateV4 } from '../__utils/uuid';

export class MemeryCustomerRepository implements CustomerRepository {
  public customers: Customer[];
  constructor() {
    this.customers = [];
  }

  nextId(): CustomerId {
    const date: Date = new Date();
    const dateStr: string = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ].join('');
    const newUuid: string = generateV4().substr(0, 20);
    const id: string = `booking-customer-${dateStr}-${newUuid}`;
    return new CustomerId(id);
  }

  findById(id: CustomerId): Customer | undefined {
    // todo
    return this.customers.find(customer => customer.id.equals(id));
  }

  findByEmail(email: String) {
    return this.customers.find(customer => customer.email === email);
  }

  deleteById(id: CustomerId): void {
    return;
  }

  save(customer: Customer): void {
    const existingCustomer = this.findById(customer.id);
    if (existingCustomer === undefined) {
      this.customers.push(customer);
    } else {
      const index = this.customers.findIndex(customer =>
        customer.id.equals(customer.id)
      );
      this.customers.splice(index, 1);
      this.customers.push(customer);
    }
  }
}
