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
    Given the Customer has already logged in
    And the Customer is on the room searching page.
  Scenario Outline: Customer search for a room
    Given the Customer has input room searching condition "<name>", <numberOfOccupants>, <priceMax>, <priceMin>, <singleBed>, <twinBed>, <doubleBed>, <pageNumber>
    When the Customer clicks the search button
    Then the available room list will be generated on the room searching page
    And the room description will be generated below
    Examples:
      | name        | numberOfOccupants | priceMax | priceMin | singleBed | twinBed | doubleBed | pageNumber |
      | Happy Paris | 3                 | 20000    | 10000    | 1         | 2       | 0         | 1          |
      | Sexy Fong   | 4                 | 10000    | 5000     | 0         | 1       | 1         | 5          |