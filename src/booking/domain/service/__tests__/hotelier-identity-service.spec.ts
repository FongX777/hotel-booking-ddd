import { HotelierId } from '../../model/hotelier/hotelier';
import { HotelIdentityService } from '../hotelier-identity-service';

describe('provision a new Hotelier', () => {
  it('should succeed', () => {
    const encrypt = (data: string) => data;
    const service = new HotelIdentityService(encrypt);

    const id = 'xxxx';
    const email = 'xxx@mail.com';
    const plainTextPassword = '123456';
    const hotelier = service.provisionHotelier({
      id: new HotelierId(id),
      email,
      plainTextPassword
    });

    expect(hotelier.id.toValue()).toBe(id);
    expect(hotelier.email).toBe(email);
    expect(hotelier.password).toBe(plainTextPassword);
  });
});
