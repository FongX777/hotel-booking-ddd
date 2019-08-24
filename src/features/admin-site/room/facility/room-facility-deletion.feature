Feature: Room Facility Deletion
  Every room facility can be deleted. If there is any room type using the room facility
  to be deleted, the room type should remove the facility after the facility deleted.

  If there is one room failing to remove the facility, the deletion of facility should be failed.

  Scenario: A hotelier deletes a room facility
    Given a hotelier
    And a room facility 'WiFi'
    And no room uses the room facility
    When the hotelier delete the room facility 'WiFi'
    Then the room facility 'WiFi' is deleted

  Scenario: A hotelier deletes a room facility used by room types
    Given a hotelier
    And a room facility 'WiFi'
    And both room type 'Single' and 'Double' have the room facility
    When the hotelier delete the room facility
    Then the room type 'Single' and 'Double' no longer have the room facility 'WiFi'
    And the room facility 'WiFi' is deleted