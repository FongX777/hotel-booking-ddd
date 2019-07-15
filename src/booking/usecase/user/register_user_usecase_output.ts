import { User } from '../../domain/user/user';

export class RegisterUserUsecaseOutput {
  user: User | null;

  constructor() {
    this.user = null;
  }

  setUser(user: User) {
    this.user = user;
  }
}
