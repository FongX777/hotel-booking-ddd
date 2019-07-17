import { User, UserId } from '../user';

describe('register an user', function() {
  it('success', function() {
    const props = {
      id: new UserId('1'),
      name: 'chi gun',
      email: 'xx@mmail.com',
      password: '123456',
      mobilePhone: '0912121212'
    };
    const user = User.register(props);

    expect(user.props).toEqual(props);
  });
});
