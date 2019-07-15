import { Entity, Identifier } from '../shared';

export class UserId extends Identifier<string> {}

interface UserProps {
  id: UserId;
  name: string;
  email: string;
  password: string;
  mobilePhone: string;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
    // check parameters....
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get mobilePhone() {
    return this.props.mobilePhone;
  }

  static register({
    id,
    name,
    email,
    password,
    mobilePhone = ''
  }: {
    id: UserId;
    name: string;
    email: string;
    password: string;
    mobilePhone?: string;
  }): User {
    return new User({
      id,
      name,
      email,
      password,
      mobilePhone
    });
  }
}
