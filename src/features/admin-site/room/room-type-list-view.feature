# TODO
Feature: Room Type List View in Admin
    * A room type name cannot be null or empty
    * the capacity of the room type cannot be < 0
    * the size of the room type cannot be < 0
    * You can add/delete mulitple rooms under a room type, and each room must have:
    * wholesale price cannot be greater than retail price
    * the retail price cannot <= 0
    * tax rate cannot be negative
    * the cover image cannot be deleted, you should delete the image after changing the cover image

  Background:
    Given a hotelier
    And a room type with name 'Standard', description 'pretty nice', capacity 2, size: 16
    And has price information of wholesale price 500, retail_price 1000, tax rate 0
    And has facility 'WiFi'
    And has a room with roomNo '101', floor 'first', extra information 'first one'
    And has an cover image 'cover.jpg' and an image 'image.jpg'

  Scenario: list
    Given ...
    When ...
    Then ...

  Scenario: search by name
    Given ...
    When ...
    Then ...

  Scenario: search by status enabled
    When ...
    Then ...

  Scenario: search by status disabled
    When ...
    Then ...

  Scenario: search by price range
    When ...
    Then ...

Feature: Search for Rooms
    * Searching for Rooms require name, numberOfOccupants, priceMax, priceMin, singleBed, twinBed, doubleBed, pageNumber
    * name (string) or null
    * numberOfOccupants > 0 (int) or null
    * priceMax >= 0, >= priceMin (int) or null
    * priceMin >= 0, <= priceMax (int) or null
    * singleBed >=0 (int) or null
    * twinBed >=0 (int) or null
    * doubleBed >=0 (int) or null
    * pageNumber >=1 or null
  Background:
    Given the Hotelier has already logged in
    And the Hotelier is on the room searching page.
  Scenario Outline: Hotelier search for a room
    Given the Hotelier has input room searching condition "<name>", <numberOfOccupants>, <priceMax>, <priceMin>, <singleBed>, <twinBed>, <doubleBed>, <pageNumber>
    When the Hotelier clicks the search button
    Then the room list will be generated on the room searching page
    And the room description will be generated below
    Examples:
      | name        | numberOfOccupants | priceMax | priceMin | singleBed | twinBed | doubleBed | pageNumber |
      | Happy Paris | 3                 | 20000    | 10000    | 1         | 2       | 0         | 1          |
      | Sexy Fong   | 4                 | 10000    | 5000     | 0         | 1       | 1         | 5          |