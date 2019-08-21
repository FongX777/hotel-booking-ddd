Feature: Room Creation
    * Room needs roomNo, name, description, numberOfOccupants, size, price, coverImage, images
    * roomNo != null, != ''
    * name != null, != ''
    * numberOfOccupants > 0 (int)
    * size > 0 (int)
    * availableDates (Date)
    * price

  Scenario Outline: Hotelier create a room
    Given a Hotelier has input room data "<roomNo>", "<name>", "<description>", <numberOfOccupants>, "<facilities>", <size>, <price>, <size>, <coverImage>, <images>
    When the Hotelier create the room
    Then the room is created

    Examples:
      | roomNo | name    | description | numberOfOccupants | facilities       | size | price | size | coverImage      | images                         |
      | 700    | Castle  | Very Pretty | 4                 | Bath, Wifi       | 10   | 1000  | 10   |                 |                                |
      | 701    | Castle2 | Very Pretty | 4                 | Bath, Wifi, Pool | 10   | 1000  | 10   | https://abc.jpg | https://abc.jpg,https:/def.jpg |





  Scenario Outline: Hotelier failes to create a room

    Given a Hotelier has input all correct data but incorrect "<field>": "<value>". correct data:
      | roomNo | name   | description | numberOfOccupants | facilities | size | price | size | coverImage      | images                         |
      | 701    | Castle | Very Pretty | 4                 | Bath       | 10   | 1000  | 10   | https://abc.jpg | https://abc.jpg,https:/def.jpg |
    When the Hotelier create the room
    Then the room failed to be created with error "<errorMessage>"

    Examples:
      | field             | value | errorMessage              |
      | price             | -100  | Invalid price             |
      | price             | 0     | Invalid price             |
      | numberOfOccupants | 0     | Invalid numberOfOccupants |
      | size              | 0     | Invalid size              |

  Scenario: Hotelier failes to create a room due to duplicate values
    Given a Hotelier and existing rooms:
      | roomNo | name   | description | numberOfOccupants | size | price | size | coverImage      | images                         |
      | 701    | Castle | Very Pretty | 4                 | 10   | 1000  | 10   | https://abc.jpg | https://abc.jpg,https:/def.jpg |
    When the Hotelier create the room with roomNumber 701
    Then the room failed with message "Duplicate RoomNo"