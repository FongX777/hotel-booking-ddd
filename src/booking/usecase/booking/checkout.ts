import { BookingRepository } from './repository';
import { BookingId } from '../../domain/model/booking/booking';

export class CheckoutBookingUsecase {
  private readonly bookingRepo: BookingRepository;
  constructor(bookingRepo: BookingRepository) {
    this.bookingRepo = bookingRepo;
  }
  execute(input: CheckoutBookingInput, output: CheckoutBookingOutput) {
    const { id } = input;
    const bookingId = new BookingId(id);
    const booking = this.bookingRepo.findById(bookingId);
    if (booking === undefined) {
      output.success = false;
    }
    else {
      booking.checkout();
      output.success = true;
    }
  }
}
export type CheckoutBookingInput = {
  id: string;
}
export type CheckoutBookingOutput = {
  success?: boolean;
}