import IUserRepository from '../../../usecase/user/i-repository';
import { User, UserId } from '../../../domain/user/user';
import uuidV4 from 'uuid/v4';

export class UserRepositoryInMem implements IUserRepository {
  private users: User[];
  constructor() {
    this.users = [];
  }

  newId(): UserId {
    return new UserId(uuidV4());
  }

  findById(id: UserId): User | undefined {
    // todo
    return this.users.find(user => user.id === id);
  }

  deleteById(id: UserId): void {
    return;
  }

  save(user: User): void {
    this.users.push(user);
  }
}
