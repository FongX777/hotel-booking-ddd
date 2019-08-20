Feature: View room detail
  Background:
    Given a Hotelier is already logged in
    And the Hotelier is on the room searching page
  Scenario Outline: Hotelier view the room detail
    Given a Hotelier has searched the rooms
    When then Hotelier click on a room entry
    Then the Hotelier will redirected to the room detail page

    Examples: