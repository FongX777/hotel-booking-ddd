import {
  HotelierLoginUsecase,
  HotelierLoginInput,
  HotelierLoginOutput
} from '../login';

import { MemeryHotelierRepository } from '../../../adapter/repository/hotelier/memory-repository';
import { Hotelier, HotelierId } from '../../../domain/model/hotelier/hotelier';

describe('Hotelier login use case', () => {
  it('should succedd', () => {
    const email = 'hotelier@test.com';
    const password = '123456';

    const repo = new MemeryHotelierRepository();
    repo.hoteliers.push(
      new Hotelier({
        id: new HotelierId('xxxxx'),
        email,
        password
      })
    );

    const input: HotelierLoginInput = {
      email,
      password
    };
    const output: HotelierLoginOutput = {};
    const usecase = new HotelierLoginUsecase('', repo);

    usecase.execute(input, output);

    expect(output.email).toBe(email);
    expect(output.id).not.toBeUndefined();
    expect(output.token).not.toBeUndefined();
  });
});
