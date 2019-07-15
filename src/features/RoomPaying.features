Feature: Paying for rooms
* paying for rooms require  orderId, thirdPartyService
* orderId >0 (int)
* thirdPartyService (enum)

Scenario Outline: Customer pays for the room by a 3rd party service
Background:
Given a Customer has already logged in
And a booking with <orderId> was made by the Customer
When the booking made by the Customer is created
Then the customer can use <thirdPartyService> to pay

Examples:
| orderId | thirdPartyService |
| 3743 | 國泰世華 |
| 59243 | 台新銀行 |