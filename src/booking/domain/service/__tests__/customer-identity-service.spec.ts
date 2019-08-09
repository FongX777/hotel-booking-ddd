import { CustomerId } from '../../model/customer/customer';
import { CustomerIdentityService } from '../customer-identity-service';

describe('register a new customer', () => {
  it('should succeed', () => {
    const encrypt = (data: string) => data;
    const service = new CustomerIdentityService(encrypt);

    const id = 'xxxx';
    const email = 'xxx@mail.com';
    const name = 'xxxx';
    const plainTextPassword = '123456';
    const customer = service.registerCustomer({
      id: new CustomerId(id),
      name,
      email,
      plainTextPassword
    });

    expect(customer.id.toValue()).toBe(id);
    expect(customer.name).toBe(name);
    expect(customer.email).toBe(email);
    expect(customer.password).toBe(plainTextPassword);
  });
});
