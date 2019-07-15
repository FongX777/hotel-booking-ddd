Feature: Customer books a room
* Booking Rooms require roomId, checkinDate, checkoutDate, paymentMethod
* roomId > 0 (int)
* checkinDate <= checkoutDate (date)
* checkoutDate >= checkinDate (date)
* paymentMethod (enum)

Background:
Given a Customer has already logged in
And a Customer is on the room searching page
And a Customer had already searched for the available rooms
Scenario Outline: book successfully
Given a room which is available for the period
When the customer choose room with <roomId>
And pick <checkinDate> and <checkoutDate>
And choose <paymentMethod>
Then the room is booked by the customer

Scenario Outline: fail to book
Given a room which is not available for the period
When the customer choose room with <roomId>
And pick <checkinDate> and <checkoutDate>
And choose <paymentMethod>
Then the room isn't booked successfully
Examples:
| roomId | checkinDate | checkoutDate | paymentMethod |
| 2 | 2019/07/31 | 2019/08/02 | CREDITCARD |
| 20 | 2019/09/30 | 2019/10/02 | CASH |