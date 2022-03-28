let todoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

let todoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};

let todoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};

let todoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};

let todoData5 = {
  title: '',
  month: '',
  year: '',
  description: 'For better physical recovery',
};

let todoData6 = {
  title: 'Buy Proteine Shakes',
  month: '',
  year: '',
  description: '',
};

let todoData7 = {
  title: 'Buy Football gear',
  month: 9,
  year: 2017,
  description: 'For soccer practice',
};

let todoData8 = {
  title: 'Buy Football gear',
  month: '9',
  year: '2017',
  description: 'For soccer practice',
};

let todoData9 = {
  title: 'Buy sunscreen',
  month: '9',
  year: '2017',
  description: "Everybody's Free To Wear Sunscreen",
}

let todoSet = [todoData1, todoData2, todoData3, todoData4, todoData5, todoData6, todoData7];

// Read NOTE 1 in Readme file
// let Todo = (function(){
//   return function(id, title, completed, month, year, description){
//     this.id = id;
//     this.title = title;
//     this.completed = completed;
//     this.month = month;
//     this.year = year;
//     this.description = description;

//     Todo.prototype.isWithinMonthYear = function(month, year) {       // we set this method on the prototype rather than the instance itself since it is a shared method
//       function isEmpty(str) {
//         return (!str || str.length === 0 );
//       }
//       if ((isEmpty(this.month) === isEmpty(month) || this.month === month) && (isEmpty(this.year) === isEmpty(year) || this.year === year)) {
//         return true
//       } else {
//         return false
//       }
//     }
//   }
// })();


let TodoList = (function(){
  let collection = [];
  let uniqueId = 0;

  let Todo = (function(){
    return function(id, title, completed, month, year, description){
      this.id = id;
      this.title = title;
      this.completed = completed;
      this.month = month;
      this.year = year;
      this.description = description;
  
      Todo.prototype.isWithinMonthYear = function(month, year) {  
        function isEmpty(str) {
          return (!str || str.length === 0 );
        }     
        if ((isEmpty(this.month) === isEmpty(month) || this.month === month) && (isEmpty(this.year) === isEmpty(year) || this.year === year)) {
          return true
        } else {
          return false
        }
      }
    }
  })();

  function generateUniqueID() {  
    uniqueId += 1;
    return uniqueId;
  };

  function getAnIndex(obj) {
    let index;
    collection.forEach(function(ele, ind) {
      if (ele.title === obj.title && ele.description === obj.description) {
        if (ele.isWithinMonthYear(obj.month, obj.year)) {
          index = ind
        }
      }
    })
    return index;
  }

  function getAnObject(obj) {
    let findObj = collection.filter(function(anObj) {
      if (anObj.title === obj.title && anObj.description === obj.description) {
        if (anObj.isWithinMonthYear(obj.month, obj.year)) {
          return true
        }
      }
    });
    return findObj[0]
  }

  function validateObj(object) {
    let arrayTitle = object.title.split(' ');
    let arrayDescription = object.description.split('');
    let firstCheck = false;
    let secondCheck = false
    
    if (arrayTitle.length > 1 && arrayTitle[0] === 'Buy' && arrayDescription.length > 0) {
      firstCheck = true;
    } 

    if (typeof object.month === 'string' && typeof object.year === 'string') {
      secondCheck = true;
    }

    if (firstCheck && secondCheck) {
      return true;
    } else {
      return false
    }
  }
  
  function adding(object) {
    let uniqueID = generateUniqueID();
    let newTodo = new Todo(uniqueID, object.title, false, object.month, object.year, object.description);
    if (validateObj(newTodo)) {
      collection.push(newTodo);
    }
  }

  function getTodo(id) {
    let objectArray = collection.filter(obj => obj.id === id);
    if (objectArray.length === 0) {
      return "This object doesn't exist.";
    } else if (objectArray) {
      return objectArray;
    }
  }

  function deepClone(givenCollection) {
    let deepCopyArray = [];
    
    givenCollection.forEach(function(currentObject) {
      let newObj = Object.create(Object.getPrototypeOf(currentObject));
      let property;

      for (property in currentObject) {
        if (Object.prototype.hasOwnProperty.call(currentObject, property)) {
          newObj[property] = currentObject[property];
        }
      }
      deepCopyArray.push(newObj)
    });

    return deepCopyArray;
  }

  return {
    initialize(array) {
      array.forEach(function(object) {
        adding(object);
      })
    },
    add(object) {
      adding(object);
    },
    returnCollection() {
      return deepClone(collection);
    },
    delete(object) {
      let findInd = getAnIndex(object);
      collection.splice(findInd, 1);
    },
    update(id, newObjectProperty) {
      let allowedProperties = ['title', 'year', 'month', 'description', 'completed'];
      let anObj = getTodo(id)[0];
      if (getTodo(id) === "This object doesn't exist.") {
        return getTodo(id)
      }
      if (anObj) {
        let array = Object.entries(newObjectProperty)[0]
        if (array[0] === 'id') {
          return "The id can't be modified."
        } else if (allowedProperties.includes(array[0])) {
          anObj[array[0]] = array[1]
          return "Object was modified successfully."
        } else {
          return "New properties can't be added to todo objects."
        }
      }

    },
    return(id) {
      if (getTodo(id) !== "This object doesn't exist.") {
        return deepClone(getTodo(id))[0]
      } else {
        return getTodo(id);
      }
    },
    // !! returnTrueCollection IS SUPPOSED TO BE COMMENTED OUT, ONLY AVAILABLE FOR TESTING PURPOSES!! See NOTE 2 in ReadMe file.
    returnTrueCollection() {
      return collection;
    }
    // !! returnTrueCollection IS SUPPOSED TO BE COMMENTED OUT, ONLY AVAILABLE FOR TESTING PURPOSES!! See NOTE 2 in ReadMe file.
  }
})();

let TodoManager = (function() {
  function timeFrame(givenMonth, givenYear) {
    let objectsToFind = TodoList.returnCollection().filter(obj => obj.isWithinMonthYear(givenMonth, givenYear));
    return objectsToFind;
  }

  function completion(array) {
    let listCompleted = array.filter(function(obj) {
      let completionString = (obj.completed).toString()
      if (completionString === 'true') {
        return true
      }
    });
    return listCompleted;
  }

  return {
    allTodos() {
      return TodoList.returnCollection();
    },
    completedTodos() {
      return completion(TodoList.returnCollection());
    },
    withinTimeFrame(givenMonth, givenYear) {
      return timeFrame(givenMonth, givenYear);
    },
    withinTimeAndStatus(givenMonth, givenYear) {
      let withinTime = timeFrame(givenMonth, givenYear);
      return completion(withinTime)
    },
  }
})()

console.log('-----Todo Testing-----');
console.log('See NOTE 1 in the ReadMe file.')
// let test = new Todo(100, 'firstTodo', true, '1', '', 'First Todo Test');
// console.log(1.1, test.id === 100);
// console.log(1.2, test.title === 'firstTodo');
// console.log(1.3, test.completed === true);
// console.log(1.4, test.month === '1');
// console.log(1.5, test.year === '');
// console.log(1.6, test.description === 'First Todo Test');
// console.log(1.7, test.hasOwnProperty('isWithinMonthYear') === false);            
// console.log(1.8, Object.getPrototypeOf(test).hasOwnProperty('isWithinMonthYear'))
// let string1 = '';
// let string2 = '';
// let string3 = 'test'
// console.log(1.9, test.isWithinMonthYear('1', '') === true)
// console.log(1.11, test.isWithinMonthYear(string1, string3) === false)
// console.log(1.12, test.isWithinMonthYear(string2, string3) === false)
console.log('-----Todo Testing-----');

console.log('')
console.log('-------TodoList Testing-------')

TodoList.initialize(todoSet);
console.log(2.1, TodoList.returnCollection().length === 4);
TodoList.add(todoData8)
console.log(2.2, TodoList.returnCollection().length === 5);
// Read NOTE 2 in ReadMe file when running test 2.3
console.log(2.3, TodoList.returnCollection() !== TodoList.returnTrueCollection())
console.log(2.4, TodoList.returnCollection().length === 5);
TodoList.delete(todoData1);
console.log(2.5, TodoList.returnCollection().length === 4);

console.log(2.6, TodoList.update(2, {completed: true}) === "Object was modified successfully.");
console.log(2.7, TodoList.update(2, {id: 3}) === "The id can't be modified.");
console.log(2.8, TodoList.update(2, {random: 3}) === "New properties can't be added to todo objects.");
console.log(2.9, TodoList.update(50, {completed: false}) === "This object doesn't exist.");
console.log(2.91, TodoList.returnCollection()[0].completed === true);

console.log(2.92, TodoList.return(2).description === TodoList.returnCollection()[0].description);
console.log(2.93, TodoList.return(50) === "This object doesn't exist.");
console.log('-------TodoList Testing-------')
console.log('')


console.log('---------TodoManager----------')
console.log(3.1, TodoManager.allTodos().length === 4);

TodoList.add(todoData9)
TodoList.update(todoData9, {completed: true})
console.log(3.2, TodoManager.completedTodos().length === 1);

console.log(3.3, TodoManager.withinTimeFrame('1', '').length === 1)
TodoList.update(8, {completed: true})
console.log(3.4, TodoManager.withinTimeAndStatus('9', '2017').length === 1);
console.log('---------TodoManager----------')




