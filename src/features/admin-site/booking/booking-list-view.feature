Feature: Hoteliter views booking list
  Background:
    Given a hoteliter has already logged in
    And in the booking list page
    And these are bookings:
      | booking-number | customer-name | total | payment   | status      | room-type | checkin-date | check-out date | created-date             |
      | 0001           | Brad          | 2000  | Bank Wire | CANCELED    | Standard  | 2019-10-10   | 2019-10-12     | 2019-09-01T19:00:10.123Z |
      | 0002           | Alice         | 3000  | Bank Wire | CHECKED_OUT | Single    | 2019-10-01   | 2019-10-03     | 2019-09-20T19:00:10.112Z |
      | 0003           | Peter         | 4000  | Bank Wire | CHECKED_IN  | Double    | 2019-10-18   | 2019-10-20     | 2019-10-05T10:00:01.333Z |

  Scenario: View the all bookings
    When the hotelier opens the page
    Then the hotelier should see all the bookings ordered by created-date in descending way
    And only the top 20 bookings should be displayed

  Scenario Outline: Filter bookings by conditions
    When the hotelier filter bookings by '<attribute' of '<attribute-value>'
    Then bookings '<booking-numbers>' should be on the list

    Examples:
      | attribute            | attribute-value | booking-numbers |
      | min-total            | 3500            | 0003            |
      | max-total            | 2100            | 0001            |
      | status               | CHECKED_OUT     | 0002            |
      | room-type            | Single          | 0002            |
      | check-in-date-start  | 2019-10-17      | 0003            |
      | check-in-date-end    | 2019-10-10      | 0001            |
      | check-out-date-start | 2019-10-19      | 0003            |
      | check-out-date-end   | 2019-10-13      | 0001            |
      | created-date-start   | 2019-10-04      | 0003            |
      | created-date-end     | 2019-10-14      | 000             |

  Scenario Outline: Filter bookings by range conditions
    When the hotelier filter bookings by '<attribute' of '<attribute-value>'
    Then bookings '<booking-numbers>' should be on the list

    Examples:
      | Header 1 | Header 2 | Header 3 |
      | Value 1  | Value 2  | Value 3  |


  Scenario Outline: Sort bookings by conditions
    When the hotelier sort bookings by '<attribute'
    Then bookings should be sorted correctly

    Examples:
      | attribute     |
      | total         |
      | checkin-date  |
      | checkout-date |
      | created-date  |
