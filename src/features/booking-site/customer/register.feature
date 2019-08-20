Feature: Register a new customer
  As a web user, I want to register on the booking-site to be customer who can use the service provided
  by the site.
  The basic information of a customer must contain an email address, a password and a name.

  Scenario:
    Given a web user
    And the web user has input email 'test@mmai.com'
    And input password '123456'
    And input name 'test'
    When the web user signed up
    Then a customer is created

  Scenario: User email must be uniqe
    Given an existing customer with email 'test@mail.com'
    And a web user
    When the web user inputs email 'test@mmai.com'
    Then the an error "Email Duplicated" shows up

  Scenario: User password length must be >= 6
    Given a web user
    And the web user has input email 'test@mmai.com'
    When the web user inputs password '12345'
    Then the an error "Password Too Short" shows up
