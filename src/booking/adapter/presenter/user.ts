import {
  RegisterUserOutputPort,
  RegisterUserOutput,
  GetUserOutputPort,
  GetUserOutput
} from '../../usecase/user/';

export type UserPrensentModel = {
  id?: string;
  name?: string;
  email?: string;
  mobilePhone?: string;
};

export class UserPrensenter
  implements RegisterUserOutputPort, GetUserOutputPort {
  success: boolean | undefined;
  message: string;
  user?: UserPrensentModel;

  constructor() {
    this.success = false;
    this.message = 'fail';
  }

  onRegistered({ id, name, email }: RegisterUserOutput): void {
    this.success = true;
    this.message = 'ok';
    this.user = { id, name, email };
  }

  onFound({ id, email, name, mobilePhone }: GetUserOutput) {
    this.success = true;
    this.message = 'ok';
    this.user = {
      id,
      email,
      name,
      mobilePhone
    };
  }

  notFound(reason: string) {
    this.success = false;
    this.message = reason;
  }
}
