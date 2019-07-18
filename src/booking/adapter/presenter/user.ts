import {
  RegisterUserOutputPort,
  ResponseModel
} from '../../usecase/user/register';

export class UserPrensenter implements RegisterUserOutputPort {
  responseModel: ResponseModel | undefined;
  onRegistered(responseModel: ResponseModel) {
    this.responseModel = responseModel;
  }
}
