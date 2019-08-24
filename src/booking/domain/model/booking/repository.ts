import { Booking, BookingId } from '../../../domain/model/booking/booking';
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export interface BookingRepository {
  nextId: () => BookingId;
  findById: (id: BookingId) => Booking | undefined;
  save: (booking: Booking) => void;
}
