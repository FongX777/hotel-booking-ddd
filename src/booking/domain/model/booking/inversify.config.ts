import { Container } from "inversify";
import { repositoryTypes } from "./types";
import { BookingRepository } from "./repository";
import { MemoryBookingRepository } from '../../../adapter/repository/booking/memory-repository';

const container = new Container();
container.bind<BookingRepository>(repositoryTypes.BookingRepository).to(MemoryBookingRepository);
export { container };
