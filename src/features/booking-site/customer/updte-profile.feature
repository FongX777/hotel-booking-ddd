Feature: Customer updates profile
  As a customer,
  I want to update my profile
  so that I make the information up-to-date

  Background:
    Given a customer has already logged in
    And the customer has profile data:
      | first-name | last-name | mobile-phone | sex  | address | country | birthday   |
      | Fong       | Liou      | 0912121212   | male | XXYY    | Japan   | 1990-10-10 |

  Scenario: upate customer's information
    When the customer updates the profile with
    Then the profile should be updated
