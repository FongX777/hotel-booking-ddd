import {Booking, BookingId,PaymentMethod, BookingStatus} from '../../domain/model/booking/booking';
import {BookingRepository} from './repository';

export class GetBookingUsecase{
    private readonly bookingRepo: BookingRepository;
    constructor(bookingRepo: BookingRepository){
        this.bookingRepo=bookingRepo;
    }
    execute(input:GetBookingInput,output:GetBookingOutput):void{
        const bookingId = new BookingId(input.id);
        const booking = this.bookingRepo.findById(bookingId);
        if(booking===undefined){
            return;
        }
        else{
            output.id = booking.id.toValue();
            output.room_id = booking.roomId.toValue();
            output.checkinDate =booking.checkinDate;
            output.checkoutDate =booking.checkoutDate;
            output.paymentMethod=booking.paymentMethod;
            output.createDate = booking.createDate;
            output.editDate=booking.editDate;
            output.status=booking.status;
        }
    }
}

export type GetBookingInput = {
    id: string
}
export type GetBookingOutput ={
    id?: string;
    room_id?:string;
    checkinDate?:Date;
    checkoutDate?:Date;
    paymentMethod?:PaymentMethod;
    createDate?: Date;
    editDate?:Date|null;
    status?:BookingStatus;
}