import {
  EditRoomUsecase,
  EditRoomInput,
  EditRoomOutput,
  CreateRoomInput,
  CreateRoomOutput,
  CreateRoomUsecase
} from '../index';

import { MemoryRoomRepository } from '../../../adapter/repository/room/memory-repository';

describe('Update room profile', function () {
  let id: string;
  const roomNo = '103A';
  const name = '至尊大屌套房';
  const description = '房間內部寬敞、臭臭的，適合一般家庭居住。';
  const numberOfOccupants = 6;
  const facilities: string[] = ['浴缸', '電視', '雙人床', '雙人床', '單人床', '單人床'];
  const size = 15;
  const price = 6940;
  const coverImage = 'https://xvideos.com?page=10000&picture=22';
  const images: string[] = [];

  const repo = new MemoryRoomRepository();
  beforeEach(async () => {
    const input: CreateRoomInput = { roomNo, name, description, numberOfOccupants, facilities, size, price, coverImage, images };
    const output: CreateRoomOutput = {};
    const usecase = new CreateRoomUsecase(repo);
    await usecase.execute(input, output);
    id = output.id as string;
  });

  const _roomNo = '103AV';
  const _name = '至尊大屌套房';
  const _description = '房間內部寬敞、很香的，附八爪椅，適合一般家庭居住。';
  const _numberOfOccupants = 7;
  const _facilities: string[] = ['浴缸', '電視', '雙人床', '雙人床', '單人床', '單人床', '八爪椅'];
  const _size = 15;
  const _price = 7888;
  const _coverImage = 'https://xvideos.com?page=10000&picture=22';
  const _images: string[] = ['https://xvideos.com?page=10000&picture=22', 'https://xvideos.com?page=10002&picture=21', 'https://xvideos.com?page=10001&picture=23'];
  const _active = true;

  it('edit a room just created', async function () {
    const usecase = new EditRoomUsecase(repo);
    const input: EditRoomInput = {
      id,
      name: _name,
      roomNo: _roomNo,
      description: _description,
      numberOfOccupants: _numberOfOccupants,
      facilities: _facilities,
      size: _size,
      price: _price,
      coverImage: _coverImage,
      images: _images,
      active: _active
    };
    const output: EditRoomOutput = {};
    await usecase.execute(input, output);
    expect(output.success).toBeTruthy();
  });
});