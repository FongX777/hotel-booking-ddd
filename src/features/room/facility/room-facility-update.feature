Feature: Room Facility Update
  Every room facility can be updated its name. If there is any room type using the room facility
  to be updated, the room facility name in the room type must equal the updated room facility room.

  Scenario: A hotelier updates a room facility
    Given a hotelier
    And a room facility 'WiFi'
    And no room uses the room facility
    When the hotelier update the room facility with new name 'WiFi-5G'
    Then the room facility is updated to 'WiFi-5G'

  Scenario: A hotelier updates a room facility used by room types
    Given a hotelier
    And a room facility 'WiFi'
    And both room type 'Single' and 'Double' have the room facility
    When the hotelier update the room facility with new name 'WiFi-5G'
    Then the room type 'Single' and 'Double' have room facility 'WiFi-5G'
    And the room facility is updated to 'WiFi-5G'