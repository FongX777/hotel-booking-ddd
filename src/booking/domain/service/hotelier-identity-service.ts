import { Hotelier, HotelierId } from '../model/hotelier/hotelier';
export class HotelIdentityService {
  private _encrypt: (text: string) => string;
  constructor(_encrypt: (text: string) => string) {
    this._encrypt = _encrypt;
  }

  provisionHotelier(params: {
    id: HotelierId;
    email: string;
    plainTextPassword: string;
  }) {
    const hashedPassword = this._encrypt(params.plainTextPassword);
    const hotelier = new Hotelier({
      id: params.id,
      email: params.email,
      password: hashedPassword
    });
    return hotelier;
  }
}
