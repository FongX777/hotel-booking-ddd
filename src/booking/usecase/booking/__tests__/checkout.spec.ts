import {
  CreateBookingInput,
  CreateBookingOutput,
  CreateBookingUsecase,
  GetBookingInput,
  GetBookingOutput,
  GetBookingUsecase,
  PayBookingInput,
  PayBookingOutput,
  PayBookingUsecase,
  CheckinBookingUsecase,
  CheckinBookingInput,
  CheckinBookingOutput,
  CheckoutBookingInput,
  CheckoutBookingOutput,
  CheckoutBookingUsecase
} from '../index'

import {
  CreateRoomUsecase,
  CreateRoomInput,
  CreateRoomOutput
} from '../../room/index';
import { PaymentMethod, BookingStatus } from '../../../domain/model/booking/booking';

import { MemoryBookingRepository } from '../../../adapter/repository/booking/memory-repository';


import { MemoryRoomRepository } from '../../../adapter/repository/room/memory-repository';

describe('Checkin for booking', function () {
  let booking_id: string;
  let room_id: string;
  const roomRepo = new MemoryRoomRepository();
  const bookingRepo = new MemoryBookingRepository();
  // create a room first
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
  // create a booking
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
  // pay a booking
  beforeEach(async function () {
    const input: PayBookingInput = { id: booking_id };
    const output: PayBookingOutput = {};
    const usecase = new PayBookingUsecase(bookingRepo);
    await usecase.execute(input, output);
    expect(output.success).toBeTruthy();
  });
  // checkin for booking
  beforeEach(async () => {
    const input: CheckinBookingInput = { id: booking_id };
    const output: CheckinBookingOutput = {};
    const usecase = new CheckinBookingUsecase(bookingRepo);
    await usecase.execute(input, output);
    expect(output.success).toBeTruthy();
  });
  // checkout for booking
  beforeEach(async () => {
    const input: CheckoutBookingInput = { id: booking_id };
    const output: CheckoutBookingOutput = {};
    const usecase = new CheckoutBookingUsecase(bookingRepo);
    await usecase.execute(input, output);
    expect(output.success).toBeTruthy();
  });
  it('check if the status is checked out', async function () {
    const input: GetBookingInput = { id: booking_id };
    const output: GetBookingOutput = {};
    const usecase = new GetBookingUsecase(bookingRepo);
    await usecase.execute(input, output);
    expect(output.id).toEqual(booking_id);
    expect(output.room_id).toEqual(room_id);
    expect(output.checkinDate).toEqual(new Date(2018, 0, 4));
    expect(output.checkoutDate).toEqual(new Date(2018, 0, 6));
    expect(output.paymentMethod).toEqual(PaymentMethod.CREDITCARD);
    expect(output.status).toEqual(BookingStatus.CHECKEDOUT);
  });
});