import { User, UserId } from '../../domain/model/user/user';
import { UserRepository } from '../../usecase/user/repository';
export class UpdateProfileUsecase {
  constructor(private readonly userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  execute(input: UpdateProfileInput, output: UpdateProfileOutput) {
    const userId = new UserId(input.id);
    const user = this.userRepo.findById(userId);

    if (user === undefined) {
      return;
    }

    user.updateProfile({
      name: input.name,
      email: input.email,
      mobilePhone: input.mobilePhone
    });

    this.userRepo.save(user);

    output.id = user.id.toValue();
    output.name = user.name;
    output.email = user.email;
    output.mobilePhone = user.mobilePhone;
  }
}

export type UpdateProfileInput = {
  id: string;
  name: string;
  email: string;
  mobilePhone: string;
};

export class UpdateProfileOutput {
  id?: string;
  name?: string;
  email?: string;
  mobilePhone?: string;
}
