@mock

Feature: Mock Test

Scenario: Open Todo App Add Todo's
      Given I open the todo web application
      When I add new todo '<item>' to field
      Then I can validate '<item>' item is injected

      Examples:
          | item        | 
          | first item  |
          
      