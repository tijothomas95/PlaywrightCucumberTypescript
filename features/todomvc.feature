@mvc
Feature: Todo MVC Feature

  Background: Opening todo web application
    Given I open the todo mvc web application

  @smoke @debug
  Scenario Outline: Can validate MVC example list
    When I click mvc framework '<item>' examples
    Then I can validate '<item>' app list items displayed

    Examples:
      | item          |
      | JavaScript    |
      | Compile-to-JS |
      | Labs          |
