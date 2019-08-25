import { Booking, BookingId } from '../../../domain/model/booking/booking';
import { generateV4 } from '../__utils/uuid';
import { BookingRepository } from '../../../domain/model/booking/repository';

export class MemoryBookingRepository implements BookingRepository {

  private bookings: Booking[];
  constructor() {
    this.bookings = [];
  }
  nextId(): BookingId {
    const date: Date = new Date();
    const dateStr: string = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ].join('');
    const newUuid: string = generateV4().substr(0, 20);
    const id: string = `create-booking-${dateStr}-${newUuid}`;
    return new BookingId(id);
  };
  findById(id: BookingId): Booking | undefined {
    return this.bookings.find(bookings => bookings.id.equals(id));
  }
  save(booking: Booking): void {
    const existingBooking = this.findById(booking.id);
    if (existingBooking === undefined) {
      this.bookings.push(booking);
    }
    else {
      const index = this.bookings.findIndex(booking => booking.id.equals(booking.id));
      this.bookings.splice(index, 1);
      this.bookings.push(booking);
    }
  }
}