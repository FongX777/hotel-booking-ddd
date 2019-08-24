import { Booking, BookingId, PaymentMethod, BookingStatus } from '../booking';
import { RoomId, Room } from '../../room/room';

let id: string;
let result: Booking;
//const createDate = new Date();
describe('Booking.create', function () {
  it('success - normal case', function () {
    const params = {
      id: new BookingId('10032'),
      roomId: new RoomId('111'),
      checkinDate: new Date(2019, 0, 4),
      checkoutDate: new Date(2019, 0, 6),
      paymentMethod: PaymentMethod.CREDITCARD
    };
    result = Booking.create(params);
    expect(result.roomId.toValue()).toEqual('111');
    expect(result.checkinDate).toEqual(new Date(2019, 0, 4));
    expect(result.checkoutDate).toEqual(new Date(2019, 0, 6));
    expect(result.paymentMethod).toEqual(PaymentMethod.CREDITCARD);
    //expect(result.createDate).toEqual(createDate);
    id = result.id.toValue(); //booking id
  });
});

describe('Booking create than edit', function () {
  it('edit data', function () {
    const params = {
      checkinDate: new Date(2019, 0, 5),
      checkoutDate: new Date(2019, 0, 8),
      paymentMethod: PaymentMethod.CASH
    }
    result.edit(params);
    expect(result.id.toValue()).toEqual(id);
    expect(result.roomId.toValue()).toEqual('111');
    expect(result.checkinDate).toEqual(new Date(2019, 0, 5));
    expect(result.checkoutDate).toEqual(new Date(2019, 0, 8));
    expect(result.paymentMethod).toEqual(PaymentMethod.CASH);
    expect(result.status).toEqual(BookingStatus.UNPAID);
  })
})

describe('change booking status', function () {
  it('booking paid', function () {
    result.pay();
    expect(result.id).toEqual(new BookingId(id));
    expect(result.status).toEqual(BookingStatus.PAID);
  })
  it('booking checkin', function () {
    result.checkin();
    expect(result.id).toEqual(new BookingId(id));
    expect(result.status).toEqual(BookingStatus.CHECKEDIN);
  })
  it('booking checkout', function () {
    result.checkout();
    expect(result.id).toEqual(new BookingId(id));
    expect(result.status).toEqual(BookingStatus.CHECKEDOUT);
  })
  it('booking close', function () {
    result.close();
    expect(result.id).toEqual(new BookingId(id));
    expect(result.status).toEqual(BookingStatus.CLOSED);
  })
})
