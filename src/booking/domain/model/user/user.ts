import { Entity, Identifier } from '../__shared';

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

  set id(id: UserId) {
    this.props.id = id;
  }
  set name(name: string) {
    this.props.name = name;
  }
  set email(email: string) {
    this.props.email = email;
  }
  set password(password: string) {
    this.props.password = password;
  }
  set mobilePhone(mobilePhone: string) {
    this.props.mobilePhone = mobilePhone;
  }

  updateProfile(params: {
    name: string;
    email: string;
    mobilePhone: string;
  }): void {
    this.name = params.name;
    this.email = params.email;
    this.mobilePhone = params.mobilePhone;
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
