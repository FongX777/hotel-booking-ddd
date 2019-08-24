Feature: Register a new customer
  As a web user,
  I want to register on the booking-site to be a customer
  so taht I  can use the service provided by the site.

  The basic information of a customer must contain an email address, a password and a name.

  Background:
    Given a web user is on the registration page

  Scenario: Register to be a customer
    Given the web user has input user information:
      | email         | password | name |
      | test@mail.com | 123456   | test |
    When the web user signed up
    Then a customer should be created

  Scenario: User email must be uniqe
    Given an existing customer with email 'test@mail.com'
    When the web user inputs email 'test@mmai.com'
    Then the web user should receive "Email Duplicated" error

  Scenario: User password length must be >= 6
    When the web user inputs password '12345'
    Then the web user should receive "Password Too Short" error
