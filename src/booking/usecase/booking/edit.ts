import {Booking,BookingId, PaymentMethod, BookingStatus} from '../../domain/model/booking/booking';
import {MemoryBookingRepository} from '../../adapter/repository/booking/memory-repository';
import { BookingRepository } from './repository';

export class EditBookingUsecase{
    private bookingRepo :BookingRepository;
    constructor(bookingRepo:BookingRepository){
        this.bookingRepo = bookingRepo;
    }

    execute(input:EditBookingInput,output:EditBookingOutput){
        const {id,room_id,checkinDate,checkoutDate,paymentMethod}=input;
        const bookingId =new BookingId(id);
        const booking = this.bookingRepo.findById(bookingId);
        if(booking ===undefined){
            output.success =false;
        }
        else{
            booking.edit({
                checkinDate,
                checkoutDate,
                paymentMethod
            });
            output.success = true;
        }
    }
}

export type EditBookingInput ={
    id: string,
    room_id:string,
    checkinDate: Date,
    checkoutDate: Date,
    paymentMethod: PaymentMethod
}
export type EditBookingOutput ={
    success?:boolean
}