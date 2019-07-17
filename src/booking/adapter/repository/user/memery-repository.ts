import IUserRepository from '../../../usecase/user/i-repository';
import { User, UserId } from '../../../domain/model/user/user';
import { generateV4 } from '../__utils/uuid';

export class MemeryUserRepository implements IUserRepository {
  private users: User[];
  constructor() {
    this.users = [];
  }

  nextId(): UserId {
    const date: Date = new Date();
    const dateStr: string = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ].join('');
    const newUuid: string = generateV4().substr(0, 20);
    const id: string = `booking-user-${dateStr}-${newUuid}`;
    return new UserId(id);
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
