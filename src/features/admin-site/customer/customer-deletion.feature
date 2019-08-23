Feature: Hotelier deletes customers
  As a hotelier
  I want to delete some users
  so that I can no more contact people I don't like

  Background:
    Given the Hotelier has already logged in
    And the Hotelier is on the customers page
    And there are customers:
      | name | email        |
      | Ann  | ann@mail.com |
      | Ben  | ben@mail.com |
      | Cat  | cat@mail.com |

  Scenario: Hotelier deletes a customer
    Given the customer 'Ann' has no booking or all of her bookings are finished (CHECK_OUT/CANCELED)
    When the hotelier deltes 'Ann'
    Then the custoemr should be deleted

  Scenario: Customer with booking not finished cannot be deleted
    Given the customer 'Ben' has 1 booking
    And the booking status is 'PAID'
    When the hotelier deltes 'Ben'
    Then the hotelier should receive an error message 'Customer Cannot be Deleted for Unfinished Booking'
