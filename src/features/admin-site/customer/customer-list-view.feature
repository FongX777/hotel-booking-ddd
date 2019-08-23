Feature: Hotelier view customer list
  As a hotelier
  I want to view customer list
  so that I can manage their data

  Background:
    Given the Hotelier has already logged in
    And the Hotelier is on the customers page
    And there are customers:
      | name | email        |
      | Ann  | ann@mail.com |
      | Ben  | ben@mail.com |
      | Cat  | cat@mail.com |

  Scenario: Customer list
    When the hotelier open the customer list
    Then all of the customer should be displayed and ordered by created-date in the descending way
    And only the top 20 customers should be displayed
