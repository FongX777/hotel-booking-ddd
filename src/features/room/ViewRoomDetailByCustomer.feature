Feature: View room detail
  Background:
    Given a Customer is already logged in
    And the Customer is on the room searching page
  Scenario Outline: Customer view the room detail
    Given a Customer has searched the rooms
    When then Customer click on a room entry
    Then the Customer will redirected to the room detail page

    Examples: