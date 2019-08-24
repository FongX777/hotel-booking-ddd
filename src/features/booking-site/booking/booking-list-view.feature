Feature: Customer views booking list
  As a customer,
  I want to view my booking list
  So that I can check my booking history

  Scenario: Get a list of bookings
    Given a customer has already logged in
    And the customer has bookings:
      | booking-number |
      | A001           |
      | A002           |
    When the customer opens 'My Bookings'
    Then the customer should see all of his bookings