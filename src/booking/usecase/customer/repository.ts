import { Customer, CustomerId } from '../../domain/model/customer/customer';
export interface CustomerRepository {
  nextId: () => CustomerId;
  findById: (id: CustomerId) => Customer | undefined;
  findByEmail: (email: String) => Customer | undefined;
  deleteById: (id: CustomerId) => void;
  save: (user: Customer) => void;
}
