Feature: Room Type Creation
    * A room type must have a name, capacity (positive integer) and contain a room
    * A room type might have description, size (postive number)
    * A room type has status enabled (default) and disabled, when the room type is disabled, the customer can't book this room type
    * You can add/delete mulitple rooms under a room type, and each room must have:
    - room No (string)
    - floor (string, ex: 'first', 'second', '1', '2')
    - status (active/inactive, default: inactive)
    - extra information (string)
    * The price information of a room type needs
    - wholesale price (optionl), default is 0
    - retail price (required), default is 0
    - tax rate (required), default is 0%
    * Facilities can be created and added to every room type
    * The number of facilities in a room type is no limit
    * You can also upload several images and add them to the room type
    * You should select one of the images to be the cover image of the room type. Default is the first one if no one selected.
    * Also you can delete images you don't want


  Scenario Outline: A hotelier creates a room type with basic information
    Given a hotelier
    And the hotelier has input room data "<name>", <capacity>
    And add a new room with "<roomNo>"
    When the hotelier creates the room type
    Then the room type and the room are created
    And wholesale_price, retail_price, and tax_rate are all 0
    But the room type status is disabled
    And the room status is inactive

    Examples:
      | name     | capacity | roomNo |
      | Standard | 2        | 101    |
      | Single   | 1        | 102    |

  Scenario Outline: A hotelier creates a room type with detailed information
    Given a hotelier
    And a room facility 'WiFi'
    And the hotelier has input room data "<name>", "<description>", <capacity>, <size>
    And input price information "<wholesale_price>", "<retail_price>", "<tax_rate>"
    And add a facility "<WiFi>"
    And add a new room with "<roomNo>", "<floor>", "<extra_information>"
    And upload an image "<image>"
    When the hotelier creates the room type
    Then the room type and the room are created
    And the first image is the cover image
    But the room type status is disabled
    And the room status is inactive

    Examples:
      | name     | description | capacity | size | wholesale_price | retail_price | tax_rate | facility | roomNo | floor | extra_information |
      | Standard | pretty nice | 2        | 16   | 500             | 1000         | 0        | WiFi     | 101    | first | first one         |