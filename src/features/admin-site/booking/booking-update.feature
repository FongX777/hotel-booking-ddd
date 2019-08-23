Feature: Hotelier updates the booking detail
  As a hotelier
  I want to update the booking detail
  so that I can keep the detail up-to-date

  Background:
    Given the Hotelier has already logged in
    And the Hotelier is on a booking page
    And there are 2 room types 'Single' and 'Double' in the booking

  Scenario Outline: Hotelier updates booking status
    When the Hotelier updates the booking status to '<status>'
    Then the booking status should be updated

    Examples:
      | status    |
      | UNPAID    |
      | PAID      |
      | CHECK_IN  |
      | CHECK_OUT |
      | CANCELED  |

  Scenario: Hotelier removes the room type in the booking
    When the hotelier removes the room type 'Single'
    Then there should be only 'Double' room type in the booking
    And the price should be re-calculated

  Scenario: Hotelier add room types in the booking
    When the hotelier adds the room type 'Standard'
    Then there should be 'Single', 'Double', 'Standard' room types in the booking
    And the price should be re-calculated


  Scenario: Hotelier adds memo to the booking
    When the hotelier adds memo message 'Emergency' to the booking
    Then the booking should have the memo message on it