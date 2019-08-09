import {
  ProvisionHotelierUsecase,
  ProvisionHotelierInput,
  ProvisionHotelierOutput
} from '../provision-hotelier';
import { MemeryHotelierRepository } from '../../../adapter/repository/hotelier/memory-repository';

describe('Provision a new hotelier', () => {
  const email = 'test@test.com';
  const plainTextPassword = '123456';
  it('should succeed', () => {
    const repostiroy = new MemeryHotelierRepository();
    const usecsae = new ProvisionHotelierUsecase(repostiroy);
    const stubedEncrypt = (data: string): string => data;
    usecsae.stubEncrypt(stubedEncrypt);
    const input: ProvisionHotelierInput = {
      email,
      plainTextPassword
    };
    const output: ProvisionHotelierOutput = {};

    usecsae.execute(input, output);

    expect(output.id).not.toBeUndefined();
    expect(output.email).toBe(email);
  });
});
