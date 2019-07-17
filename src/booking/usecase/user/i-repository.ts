import { User, UserId } from '../../domain/user/user';
export default interface IUserRepository {
  nextId: () => UserId;
  findById: (id: UserId) => User | undefined;
  deleteById: (id: UserId) => void;
  save: (user: User) => void;
}
