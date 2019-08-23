Feature: Customer Books a room
  As a customer,
  I want to book a room type at a specific date range
  So that I can stay at the time I desired

  Background:
    Given a Customer has already logged in
    And the customer has chosen the desired room type by date ranges

  Scenario: book successfully
    Given the room type is available for the period
    When the customer books the room
    And confirm the booking detail
    And choose the paymentMethod
    Then the room type should be booked by the customer
    And the booking status should be 'UNPAID'