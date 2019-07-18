import { User, UserId } from '../../domain/model/user/user';
export interface UserRepository {
  nextId: () => UserId;
  findById: (id: UserId) => User | undefined;
  deleteById: (id: UserId) => void;
  save: (user: User) => void;
}
