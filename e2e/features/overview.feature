Feature: ABC-Story-1 Configuring the Agrid Table
  Scenario: Check aggrid table exists when a valid user login into the application
    Given user is in the Login page
    And user clicks on the dropdown
    And set the username as 'TestUser' from the dropdown
    When user clicks on the login button
    Then user is redirected to the show Data page showing title 'Welcome to Table page'
    And aggrid table exists
