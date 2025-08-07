@todo
Feature: Todo Feature

Background: Opening todo web application
  Given I open the todo web application

@smoke
Scenario Outline: Can Add Todo item
  When I add new todo '<item>' to field
  Then I can validate '<item>' item is injected

  Examples:
    | item        | 
    | first todo  |
    | second todo |


@regression @debug
Scenario Outline: Can remove todo item
  When I add new todo '<item>' to field
  Then I can validate '<item>' item is injected
  When I remove the '<item>' from todo list
  Then I can validate todo item list is not displayed

  Examples:
    | item         | 
    | sample todo  |     
