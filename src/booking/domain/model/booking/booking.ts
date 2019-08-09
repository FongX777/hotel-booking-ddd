import {Entity,Identifier} from  '../__shared';
import { RoomId } from '../room/room';

export class BookingId extends Identifier<string>{}
export const enum BookingStatus{
    UNPAID,
    PAID,
    CHECKEDIN,
    CHECKEDOUT,
    CLOSED
}
export const enum PaymentMethod{
    CASH,
    CREDITCARD
}

export interface BookingProps{
    id: BookingId;
    roomId: RoomId;
    checkinDate: Date;
    checkoutDate: Date;
    paymentMethod: PaymentMethod;
    createDate: Date;
    editDate?: Date | null;
    status: BookingStatus;
}
export class Booking extends Entity<BookingProps>{
    private constructor(props:BookingProps){
        super(props);
        if(this.props.checkinDate >= this.props.checkoutDate){
            throw new Error('checkout date cannot be smaller than checkin date');
        }
    }
    get id(): BookingId{
        return this.props.id;
    }
    get roomId(): RoomId{
        return this.props.roomId;
    }
    get checkinDate(){
        return this.props.checkinDate;
    }
    get checkoutDate(){
        return this.props.checkoutDate;
    }
    get paymentMethod(){
        return this.props.paymentMethod;
    }
    get createDate(){
        return this.props.createDate;
    }
    get editDate(){
        return this.props.editDate;
    }
    get status(){
        return this.props.status;
    }

    static create (params:{
        id: BookingId;
        roomId: RoomId;
        checkinDate: Date,
        checkoutDate: Date,
        paymentMethod: PaymentMethod
    }): Booking{
        const props: BookingProps={
            ...params,
            createDate:new Date(),
            editDate: null,
            status: BookingStatus.UNPAID
        };
        return new Booking(props);
    };

    static build (params:BookingProps){
        return new Booking(params);
    }

    edit(params:{
        checkinDate:Date;
        checkoutDate:Date;
        paymentMethod:PaymentMethod;
    }){
        if(this.props.paymentMethod !== params.paymentMethod && this.props.status !==BookingStatus.UNPAID){
            throw new Error('only unpaid booking\'s payment method can be changed.');
        }
        const new_props: BookingProps={
            id:this.props.id,
            roomId:this.props.roomId,
            checkinDate:params.checkinDate,
            checkoutDate:params.checkoutDate,
            paymentMethod: params.paymentMethod,
            createDate: this.props.createDate,
            editDate: new Date(),
            status: this.props.status
        };
        this.props= new_props;
    }

    pay(){
        if(this.props.status===BookingStatus.UNPAID){
            this.props.status = BookingStatus.PAID;
        }
        else{
            throw new Error('paid');
        }
    }

    checkin(){
        if(this.props.status===BookingStatus.PAID){
            this.props.status = BookingStatus.CHECKEDIN;
        }
        else{
            throw new Error('checkin');
        }
    }
    
    checkout(){
        if(this.props.status===BookingStatus.CHECKEDIN){
            this.props.status = BookingStatus.CHECKEDOUT;
        }
        else{
            throw new Error('checkout');
        }
    }
    
    close(){
        this.props.status = BookingStatus.CLOSED;
    }
}