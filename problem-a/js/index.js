'use strict';

/* your code goes here! */

class Task { 
  constructor(newDescription, completion) {
    this.description = newDescription;
    this.complete = completion;
  }
  
  render() {
    let newElement = document.createElement('li');
    newElement.textContent = this.description;
    if (this.complete == true) {
      newElement.classList.add('font-strike');
    }
    newElement.addEventListener('click', () => { 
      this.toggleFinished();
      newElement.classList.toggle('font-strike');
    });
    return newElement;
  }

  toggleFinished() {
    if (this.complete == false) {
      this.complete = true;
    } else {
      this.complete = false;
    }
  }
}

class TaskList {
  constructor(task) {
    this.tasks = task;
  }

  addTask(taskDescript) {
    let taskObj = new Task(taskDescript, false);
    this.tasks.push(taskObj);
  }

  render() {
    let orderedli = document.createElement('ol');
    this.tasks.forEach((element) => {
      let listElem = element.render();
      orderedli.appendChild(listElem);
    });
    return orderedli;
  }
}

class NewTaskForm {
  constructor(callback) {
    this.submitCallback = callback;
  }

  render() {
    let newForm = document.createElement('form');
    let newInput = document.createElement('input');
    newInput.classList.add('form-control', 'mb-3');
    newInput.setAttribute('placeholder', "What else do you have to do?");
    newForm.appendChild(newInput);
    let newButton = document.createElement('button');
    newButton.classList.add('btn', 'btn-primary');
    newButton.textContent = "Add task to list";
    newForm.appendChild(newButton);
    newButton.addEventListener('click', (event) => {
      event.preventDefault();
      let inputValue = newInput.value;
      this.submitCallback(inputValue);
    });
    return newForm;
  }
}

class App {
  constructor (parent, list) {
    this.parentElement = parent;
    this.taskList = list;
  }

  render() {
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);
    let call = (arg) => this.addTaskToList(arg);
    let formObj = new NewTaskForm(call);
    this.parentElement.appendChild(formObj.render());
  }

  addTaskToList(descriptStr) {
    this.taskList.addTask(descriptStr);
    this.parentElement.innerHTML = '';
    this.render();
  }
}

let taskListObj = new TaskList ([
  new Task("Make some classes", true),
  new Task("Arrow some functions", false)
]);

let appElem = document.querySelector('#app');
let appObj = new App(appElem, taskListObj);
appObj.render();

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
