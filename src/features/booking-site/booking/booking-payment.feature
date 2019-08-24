Feature: Customer pays for the booking
  As a customer,
  I want to pay for the booking
  so that I can fininsh the booking

  Scenario: customer pays with bankwire
    Given a hotelier
    And a custoemr has already logged in
    When the customer pays
    And the hotelier confirmed the payment
    Then the hotelier should mark the booking as 'PAID'