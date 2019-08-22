Feature: Search Room Types
  As a customer,
  I want to search available room types by dates and filter them with
  so that I can view them and choose what I want to stay.

  As a customer
  I want to filter the searching results by capacity or retail prices
  so that I can find the one I want quickly

  Background:
    Given a custoemr has logged in
    And there are rooms type:
      | name   | available-dates         | capacity | retail-price |
      | Single | 2019-10-10 - 2019-10-20 | 1        | 1000         |
      | Double | 2019-10-15 - 2019-10-30 | 2        | 3000         |

  Scenario Outline: Search room types from given date range
    When the custoemr searches room type from '<check-in-date>' to '<check-out-date>'
    Then room type '<room-type-name>' appears on the searching result list

    Examples:
      | check-in-date | check-out-date | room-type-name |
      | 2019-10-10    | 2019-10-12     | Single         |
      | 2019-10-10    | 2019-10-12     | Single         |

  Scenario Outline: Filter search results by some attributes of room types
    Given all rooms are already displayed on the searching result list
    When the customer uses '<attribute>' of '<attribute-value>' to filter
    Then room type '<room-type-name>' should appear on the searching result

    Examples:
      | attribute | attribute-value | room-type-name |
      | capacity  | 1               | Single         |
      | capacity  | 2               | Double         |
      | min-price | 1500            | Double         |
      | max-price | 1500            | Single         |
