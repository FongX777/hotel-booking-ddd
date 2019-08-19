Feature: Room Type Deletion
  Every room type can be deleted. However, if a there is any booking on the room type is
  not checked-out and not canceled, the deletion should fail.

  Scenario: A hotelier deletes a room type no booking on the room type
    Given a hotelier
    And a room type 'Standard'
    When the hotelier deletes the room type
    Then the room type is deleted.

  Scenario: A hotelier deletes a room type with checked-in bookings on the room type
    Given a hotelier
    And a room type 'Standard'
    And there is a booking with status 'CHECKED_IN' on the room type
    When the hotelier deletes the room type
    Then the deletion failed with message "Failed - There are bookings still need the room type"
