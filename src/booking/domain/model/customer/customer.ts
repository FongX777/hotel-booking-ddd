import { Entity, Identifier } from '../__shared';

export class CustomerId extends Identifier<string> {}

interface CustomerProps {
  id: CustomerId;
  name: string;
  email: string;
  password: string;
  mobilePhone: string;
}

export class Customer extends Entity<CustomerProps> {
  constructor(props: CustomerProps) {
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

  set id(id: CustomerId) {
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
    id: CustomerId;
    name: string;
    email: string;
    password: string;
    mobilePhone?: string;
  }): Customer {
    return new Customer({
      id,
      name,
      email,
      password,
      mobilePhone
    });
  }
}
