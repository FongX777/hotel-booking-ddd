import {
  RegisterUserOutputPort,
  ResponseModel,
  GetUserOutputPort
} from '../../usecase/user/';

export class UserPrensenter
  implements RegisterUserOutputPort, GetUserOutputPort {
  responseModel: ResponseModel | undefined;

  onRegistered(responseModel: ResponseModel) {
    this.responseModel = responseModel;
  }
  onFound() {}
  notFound() {}
}
