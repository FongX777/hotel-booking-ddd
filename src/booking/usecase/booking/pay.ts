import { BookingRepository } from '../../domain/model/booking/repository';
import { BookingId } from '../../domain/model/booking/booking';

export class PayBookingUsecase {
  private readonly bookingRepo: BookingRepository;
  constructor(bookingRepo: BookingRepository) {
    this.bookingRepo = bookingRepo;
  }
  execute(input: PayBookingInput, output: PayBookingOutput) {
    const { id } = input;
    const bookingId = new BookingId(id);
    const booking = this.bookingRepo.findById(bookingId);
    if (booking === undefined) {
      output.success = false;
    }
    else {
      booking.pay();
      output.success = true;
    }
  }
}

export type PayBookingInput = {
  id: string;
}

export type PayBookingOutput = {
  success?: boolean;
}