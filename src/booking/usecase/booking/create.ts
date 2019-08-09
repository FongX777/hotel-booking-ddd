import {BookingId,Booking, PaymentMethod} from '../../domain/model/booking/booking';
import {BookingRepository} from './repository';
import { RoomId } from '../../domain/model/room/room';

export class CreateBookingUsecase{
    private bookingRepo:BookingRepository;
    constructor(bookingRepo:BookingRepository){
        this.bookingRepo = bookingRepo;
    }
    execute(input:CreateBookingInput,output:CreateBookingOutput):void{
        const id : BookingId = this.bookingRepo.nextId();
        const {room_id,checkinDate,checkoutDate,paymentMethod} = input;
        const roomId : RoomId= new RoomId(room_id);
        const booking:Booking = Booking.create({
            id,
            roomId,
            checkinDate,
            checkoutDate,
            paymentMethod
        });
        this.bookingRepo.save(booking);
        output.success = true;
        output.id = id.toValue();
    }
}

export type CreateBookingInput = {
    room_id:string,
    checkinDate: Date,
    checkoutDate : Date,
    paymentMethod : PaymentMethod
}
export type CreateBookingOutput = {
    id?:string,
    success?:boolean
}