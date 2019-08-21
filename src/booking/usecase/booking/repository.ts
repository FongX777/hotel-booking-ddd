import { Booking, BookingId } from '../../domain/model/booking/booking';

export interface BookingRepository {
  nextId: () => BookingId;
  findById: (id: BookingId) => Booking | undefined;
  save: (booking: Booking) => void;
}
