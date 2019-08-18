Feature: Room Type Creation
    * A room type must have a name, description, capacity (positive integer), size (postive number)
    * A room type has status enabled and disabled, when the room type is disabled, the customer can't book this room type
    * The price information of a room type needs
    - wholesale price (optionl), default is 0
    - retail price (required)
    - tax rate (required), default is 0%
    * Facilities can be created and added to every room type
    * The number of facilities in a room type is no limit
    * YOu can add/delete mulitple rooms under a room type, and each room must have:
    - room No (string)
    - floor (string, ex: 'first', 'second', '1', '2')
    - status (active/inactive)
    - extra information (string)
    * You can also upload several images and add them to the room type
    * You should select one of the images to be the cover image of the room type. Default is the first one if no one selected.
    * Also you can delete images you don't want



  Scenario: A hotelier creates a room type
    Given a hotelier has input room data "<name>", "<description>",
    <capacity>, <size>, and <retail_price>, and "<images>"
    When the Hotelier create the room
    Then the room is created

  Scenario: A hotelier creates a room type with detailed information
    Given a hotelier has input room data "<name>", "<description>",
    <capacity>, <size>, and <retail_price>, and "<images>"
    When the Hotelier create the room
    Then the room is created