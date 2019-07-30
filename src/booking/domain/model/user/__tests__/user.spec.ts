import { User, UserId } from '../user';

describe('register an user', function() {
  it('should succeed', function() {
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

describe('update an user profile', function() {
  it('should succeed', function() {
    const user = new User({
      id: new UserId('1'),
      name: 'chi gun',
      email: 'xx@mmail.com',
      password: '123456',
      mobilePhone: '0912121212'
    });

    const newName = 'fong';
    const newEmail = 'yy@mail.com';
    const newMobilePhone = '0921212121';
    user.updateProfile({
      name: newName,
      email: newEmail,
      mobilePhone: newMobilePhone
    });

    expect(user.props).toEqual({
      id: new UserId('1'),
      name: newName,
      email: newEmail,
      password: '123456',
      mobilePhone: newMobilePhone
    });
  });
});

// to do edit test