Feature: Customer changes password
  As a customer,
  I want to change my password
  so that I can log in again

  Scenario:
    Given a customer 'test' has password '123456'
    And input original password '123456'
    And input new passowrd '654321' twice
    When the customer applys the change
    Then the customer's passworc should be changed to '654321'

  Scenario: User password length must be >= 6
    Given a customer 'test' has password '123456'
    And input original password '123456'
    When the customer inputs new passowrd '65432'
    Then the an error "Password Too Short" should show up
