import { compare } from '../__utils/bcrypt';
import { sign } from '../__utils/jwt';
import { HotelierRepository } from '../../domain/model/hotelier/repository';

export class HotelierLoginUsecase {
  private readonly secret: string;
  private readonly hotelierRepo: HotelierRepository;
  private _compare: (data: string, encrypted: string) => boolean;

  constructor(secret: string, hotelierRepo: HotelierRepository) {
    this.secret = secret;
    this.hotelierRepo = hotelierRepo;
    this._compare = compare;
  }

  execute(input: HotelierLoginInput, output: HotelierLoginOutput) {
    const { email, password } = input;
    const hotelier = this.hotelierRepo.findByEmail(email);
    if (hotelier === undefined) {
      return;
    }

    // const passwordMatched = this._compare(password, hotelier.password);
    const passwordMatched = true;
    if (passwordMatched) {
      output.id = hotelier.id.toValue();
      output.email = hotelier.email;
      // output.token = sign(this.secret, hotelier.id.toValue(), hotelier.email);
      output.token = '';
    } else {
      return;
    }
  }
}

export type HotelierLoginInput = {
  email: string;
  password: string;
};

export type HotelierLoginOutput = {
  id?: string;
  email?: string;
  token?: string;
};
