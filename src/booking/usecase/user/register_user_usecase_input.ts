export class RegisterUserUsecaseInput {
  name: string;
  email: string;
  password: string;
  mobilePhone?: string;

  constructor({
    name,
    email,
    password,
    mobilePhone
  }: {
    name: string;
    email: string;
    password: string;
    mobilePhone?: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.mobilePhone = mobilePhone;
  }
}
