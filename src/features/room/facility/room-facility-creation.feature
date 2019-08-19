Feature: Room Facility Creation
  Every facility must have a name

  Scenario: A hotelier creates a room facility
    Given a hotelier has input facility name "WiFi"
    When the hotelier creates the room facility
    Then the room facility is created with a name "WiFi"

  Scenario Outline: A hotelier creates a room type with detailed information
    Given a hotelier has input room data "<name>", "<description>", <capacity>, <size>
    And input price information "<wholesale_price>", "<retail_price>", "<tax_rate>"
    And input facilities "<facilities>"
    And add a new room with "<roomNo>", "<floor>", "<extra_information>"
    And upload an image "<image>"
    When the hotelier creates the room type
    Then the room type and the room are created
    But the room type status is disabled
    And the room status is inactive

    Examples:
      | name     | description | capacity | size | wholesale_price | retail_price | tax_rate | facilities           | roomNo | floor | extra_information |
      | Standard | pretty nice | 2        | 16   | 500             | 1000         | 0        | ["Wifi", "BathRoom"] | 101    | first | first one         |