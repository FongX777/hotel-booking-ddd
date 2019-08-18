import {BookingRepository} from './repository';
import {BookingId, Booking} from '../../domain/model/booking/booking';

export class CloseBookingUsecase{
    private readonly bookingRepo:BookingRepository;
    constructor(bookingRepo:BookingRepository){
        this.bookingRepo = bookingRepo;
    }
    execute(input:CloseBookingInput,output:CloseBookingOutput){
        const {id} = input;
        const bookingId = new BookingId(id);
        const booking  = this.bookingRepo.findById(bookingId);
        if(booking ===undefined){
            output.success = false;
        }
        else{
            booking.close();
            output.success= true;
        }
    }
}

export type CloseBookingInput = {
    id:string;
}
export type CloseBookingOutput = {
    success?:boolean;
}