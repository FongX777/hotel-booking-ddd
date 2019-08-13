import {BookingRepository} from './repository';
import {BookingId} from '../../domain/model/booking/booking';

export class CheckinBookingUsecase{
    private readonly bookingRepo:BookingRepository;
    constructor(bookingRepo:BookingRepository){
        this.bookingRepo = bookingRepo;
    }
    execute(input:CheckinBookingInput,output:CheckinBookingOutput){
        const {id} = input;
        const bookingId = new BookingId(id);
        const booking =this.bookingRepo.findById(bookingId);
        if(booking===undefined){
            output.success=false;
        }
        else{
            booking.checkin();
            output.success=true;
        }
    }
}
export type CheckinBookingInput={
    id:string;
}
export type CheckinBookingOutput ={
    success?:boolean;
}