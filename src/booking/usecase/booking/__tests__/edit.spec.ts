import {
  CreateBookingInput,
  CreateBookingOutput,
  CreateBookingUsecase,
  GetBookingInput,
  GetBookingOutput,
  GetBookingUsecase,
  EditBookingInput,
  EditBookingOutput,
  EditBookingUsecase
} from '../index';
import {
  CreateRoomInput,
  CreateRoomOutput,
  CreateRoomUsecase
} from '../../room/index';
//import { MemoryBookingRepository } from '../../../adapter/repository/booking/memory-repository';
import { BookingRepository } from '../../../domain/model/booking/repository';
import { repositoryTypes } from '../../../domain/model/booking/types';
import { container } from '../../../domain/model/booking/inversify.config';

import { MemoryRoomRepository } from '../../../adapter/repository/room/memory-repository';
import { PaymentMethod, BookingStatus } from '../../../domain/model/booking/booking';

describe('Edit a Booking', function () {
  let booking_id: string;
  let room_id: string;
  const roomRepo = new MemoryRoomRepository();
  const bookingRepo = container.get<BookingRepository>(repositoryTypes.BookingRepository);//new MemoryBookingRepository();
  //create a room
  beforeEach(async () => {
    const roomNo = '103A';
    const name = '至尊大屌套房';
    const description = '房間內部寬敞、臭臭的，適合一般家庭居住。';
    const numberOfOccupants = 6;
    const facilities: string[] = ['浴缸', '電視', '雙人床', '雙人床', '單人床', '單人床'];
    const size = 15;
    const price = 6940;
    const coverImage = 'https://xvideos.com?page=10000&picture=22';
    const images: string[] = [];
    const input: CreateRoomInput = { roomNo, name, description, numberOfOccupants, facilities, size, price, coverImage, images };
    const output: CreateRoomOutput = {};
    const usecase = new CreateRoomUsecase(roomRepo);
    await usecase.execute(input, output);
    room_id = output.id as string;
    expect(output.success).toBeTruthy();
  });
  //create a booking
  beforeEach(async () => {
    const checkinDate = new Date(2018, 0, 4);
    const checkoutDate = new Date(2018, 0, 6);
    const paymentMethod = PaymentMethod.CREDITCARD;
    const input: CreateBookingInput = { room_id, checkinDate, checkoutDate, paymentMethod };
    const output: CreateBookingOutput = {};
    const usecase = new CreateBookingUsecase(bookingRepo);
    await usecase.execute(input, output);
    booking_id = output.id as string;
    expect(output.success).toBeTruthy();
  });
  //edit a booking
  beforeEach(async function () {
    const checkinDate = new Date(2018, 0, 5);
    const checkoutDate = new Date(2018, 0, 7);
    const paymentMethod = PaymentMethod.CASH;
    const input: EditBookingInput = { id: booking_id, room_id, checkinDate, checkoutDate, paymentMethod };
    const output: EditBookingOutput = {};
    const usecase = new EditBookingUsecase(bookingRepo);
    await usecase.execute(input, output);
    expect(output.success).toBeTruthy();
  });
  // get a booking
  it('Get a booking', async function () {
    const input: GetBookingInput = { id: booking_id };
    const output: GetBookingOutput = {};
    const usecase = new GetBookingUsecase(bookingRepo);
    await usecase.execute(input, output);
    expect(output.id).toEqual(booking_id);
    expect(output.room_id).toEqual(room_id);
    expect(output.checkinDate).toEqual(new Date(2018, 0, 5));
    expect(output.checkoutDate).toEqual(new Date(2018, 0, 7));
    expect(output.paymentMethod).toEqual(PaymentMethod.CASH);
    expect(output.status).toEqual(BookingStatus.UNPAID);
  });
});