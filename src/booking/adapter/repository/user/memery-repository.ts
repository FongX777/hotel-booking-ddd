import { UserRepository } from '../../../usecase/user';
import { User, UserId } from '../../../domain/model/user/user';
import { generateV4 } from '../__utils/uuid';

export class MemeryUserRepository implements UserRepository {
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
    return this.users.find(user => user.id.equals(id));
  }

  findByEmail(email: String) {
    return this.users.find(user => user.email === email);
  }

  deleteById(id: UserId): void {
    return;
  }

  save(user: User): void {
    const existingUser = this.findById(user.id);
    if (existingUser === undefined) {
      this.users.push(user);
    } else {
      const index = this.users.findIndex(user => user.id.equals(user.id));
      this.users.splice(index, 1);
      this.users.push(user);
    }
  }
}
