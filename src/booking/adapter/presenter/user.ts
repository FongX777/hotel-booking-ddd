import {
  RegisterUserOutputPort,
  RegisterUserRespModel,
  GetUserOutputPort,
  GetUserResp
} from '../../usecase/user/';

interface UserPrensentModel {
  id?: string;
  name?: string;
  email?: string;
  mobilePhone?: string;
}

export class UserPrensenter
  implements RegisterUserOutputPort, GetUserOutputPort {
  success: boolean | undefined;
  user?: UserPrensentModel;

  constructor() {
    this.success = false;
  }

  onRegistered({ id, name, email }: RegisterUserRespModel): void {
    this.success = true;
    this.user = { id, name, email };
  }

  onFound({ id, email, name, mobilePhone }: GetUserResp) {
    this.success = true;
    this.user = {
      id,
      email,
      name,
      mobilePhone
    };
  }

  notFound() {
    this.success = false;
  }
}
