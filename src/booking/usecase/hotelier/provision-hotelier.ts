import { HotelierRepository } from '../../domain/model/hotelier/repository';
import { encrypt } from '../__utils/bcrypt';
import { HotelIdentityService } from '../../domain/service/hotelier-identity-service';

export class ProvisionHotelierUsecase {
  private readonly hotelierRepo: HotelierRepository;
  private _encrypt: (data: string) => string;
  constructor(hotelierRepo: HotelierRepository) {
    this.hotelierRepo = hotelierRepo;
    this._encrypt = encrypt;
  }

  execute(input: ProvisionHotelierInput, output: ProvisionHotelierOutput) {
    const { email, plainTextPassword } = input;
    const hotelierIdentityService = new HotelIdentityService(this._encrypt);
    const hotelier = hotelierIdentityService.provisionHotelier({
      id: this.hotelierRepo.nextId(),
      email,
      plainTextPassword
    });
    output.id = hotelier.id.toValue();
    output.email = hotelier.email;
  }

  /** for testing usage */
  stubEncrypt(_encrypt: (data: string) => string) {
    this._encrypt = _encrypt;
  }
}

export type ProvisionHotelierInput = {
  email: string;
  plainTextPassword: string;
};
export type ProvisionHotelierOutput = {
  id?: string;
  email?: string;
};
