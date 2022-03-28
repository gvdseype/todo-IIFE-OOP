### Todo Manager

Here we are building a small todo app with a `Todo Manager`. Below you will find the requirements of all the entities that will interact with each other.

1. The Todo Manager is responsible for returning a set of todos from a todo list based on certain criterias. More precisely, it should be able to:
   - Return all `todo` objects
   - return all completed todo objects
   - return all todo objects within a given month-year combination
   - return all completed todo objects within a given month-year combination
2. The Todo List is an object that has a collection of todo objects. It must be able to support the following operations:
   - Maintain a collection of todo objects
   - add a todo object to the collection
   - delete a todo object from the collection
   - Initialise the collection with todo objects
   - Update existing properties of a specific todo object
   - returns a specified todo object based on an id property
3. The Todo object has the following properties:
   - id (which must be unique)
   - title
   - completion status
   - month
   - year
   - description

### Walking the user through the app 

As this exercise is heavily focused on testing, the app will be explained by guiding the user through each test which checks a specific feature functionality. We divide the functionalities along the same structure as above (todo object, todo list, todo manager).

#### TODO Testing

`NOTE 1`: In order to test 1.1 - 1.12, you will first have to uncomment line 66 to 86. The IIFE 'Todo' on line 66-83 is put there just for testing purposes only. The actual Todo constructor function resides within the TodoList IIFE. We moved the Todo constructor function inside TodoList constructor funciton so that the user can't add any additional methods on the Todo.prototype.

1.7 & 1.8 Show that Todo instances don't have their own copy of the 'isWithinMonthYear' method, it is being shared through the constructor's function prototype.

1.9 - 1.12 The isWithinMonthYear checks if the passed in month and year are empty strings or have truthy values. The isEmpty function helps detect an empty string, which is a falsy value and can't be compared loosely.

#### TODOLIST Testing

2.1 Since initialize expects an array(todoSet), we iterate through the passed object and pass each individual object within the adding method, which 

  - generates a unique id
  - instantiates a new Todo object and pushes that new object into the collection.

The collection is private and won't be accessible from outside the IIFE.

2.2 The add method works like the initialize method but instead of taking an array it will work with a single individual todoData. Any todoData that needs to be added needs to start with 'Buy' in the title, the description of the object can't be empty, the month and year must be in string format.

2.3 The returnCollection method returns a deep copy of the 'collection' variable. It leverages the helper method deepClone to do that. The deepClone method creates a new object by using the prototype of any object on the array that was passed in the deepClone method. This means that the new object will have access to any methods residing on the prototype of the current object in the iteration.
All the properties that sit on the current object in the array will be added to our new object, after which it is added to the deepCopyArray. Lastly, the deepCopyArray is returned by the deepClone method. 
This means that any time the TodoList object uses the returnCollection method, the user won't have any access to the real copy of the collection array, and won't be able to make any lasting changes on its objects.
  `NOTE 2`: to prove the returnCollection returns a copy of the collection and not the reference of it, we compared it to the return value of the returnTrueCollection method, which doesn return the actual collection array. Because both methods don't return same array 2.3 logs 'false'.

2.4 & 2.5 These tests show how the delete method has a lasting effect on the collection. We use the helper method getAnIndex to find the index of an object, and use splice on the collection with said index.

2.6 Shows how we can update an object on the collection by passing a todoData. The update method leverages the getAnObject helper method which returns the corresponding Todo object in our collection. The found Todo object is then mutated with the newObjectProperty. We assumed only one new property would be passed in at a time. 

2.7 & 2.8 The return method leverages the helper method getTodo which uses the id argument.
The getTodo helper method will return an object in the collection with matching id property or a string indicating that the collection has no object with the provided id.
The return method will provide a copy of the object by leveraging the deepClone helper method

#### TODOMANAGER Testing

3.1 The allTodos simply leverages the TodoList returnCollection method.

3.2 The completedTodos method leverages the completion helper method. The completion method check the status of completion of any object on the passed in array by transforming the boolean value in a string, which can be evaluated to 'true'. Only objects that can evaluate their stringified complete property to 'true' will be returned in the returned array of the method.

3.3 The withinTimeFrame leverages the timeFrame helper method, which call the isWithinMonthYear method that resides on the prototype object of the constructor function Todo.

3.4 the withinTimeandStatus combines the completion helper method and the timeFrame helper method. The timeFrame helper method will call isWithinMonthYear of the Todo.prototype object to check if there the month and year match.
