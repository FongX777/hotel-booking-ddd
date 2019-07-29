import { Customer, CustomerId } from '../customer';

describe('customer register', function() {
  it('should succeed', function() {
    const props = {
      id: new CustomerId('1'),
      name: 'chi gun',
      email: 'xx@mmail.com',
      password: '123456',
      mobilePhone: '0912121212'
    };
    const customer = Customer.register(props);

    expect(customer.props).toEqual(props);
  });
});

describe('update an customer profile', function() {
  it('should succeed', function() {
    const customer = new Customer({
      id: new CustomerId('1'),
      name: 'chi gun',
      email: 'xx@mmail.com',
      password: '123456',
      mobilePhone: '0912121212'
    });

    const newName = 'fong';
    const newEmail = 'yy@mail.com';
    const newMobilePhone = '0921212121';
    customer.updateProfile({
      name: newName,
      email: newEmail,
      mobilePhone: newMobilePhone
    });

    expect(customer.props).toEqual({
      id: new CustomerId('1'),
      name: newName,
      email: newEmail,
      password: '123456',
      mobilePhone: newMobilePhone
    });
  });
});
