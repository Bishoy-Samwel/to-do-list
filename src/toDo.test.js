import {createTaskDiv,showTasks} from './__mocks__/ui';

import List from './list';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
jest.mock('./list');
jest.mock('./ui');

const myList = new List();
describe('test the addTask function', () => {
  test('should add a task', () => {
    myList.addTask('clean');
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[0].desc).toBe('clean');
  });

  test('should update the tasks description', () => {
    myList.addTask('wash car');
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[1].desc).toBe('wash car');
  });
});

describe('test the removeTask function', () => {
  test('should remove a task', () => {
    const { id } = myList.tasks[myList.tasks.length - 1];
    myList.removeTask(id);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks.length).toBe(1);
  });
});

// test the function that is being used by addTask function and removeTask function
describe('test the updateItemsIndex function', () => {
  test('should update the index of  a task', () => {
    myList.addTask('code');
    myList.addTask('buy stocks  b');
    myList.updateItemsIndex();
    expect(myList.tasks[2].index).toBe(2);
  });
});

test('returns a div with the task', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const dom = new JSDOM('<body></body>');
  const task = createTaskDiv(dom, myList, tasks[0]);
  expect(task.querySelector('.task-desc').value).toBe('clean');
});

describe('test the editTask function', () => {
  test('edit the description of the task', () => {
    const { id } = myList.tasks[myList.tasks.length - 1];
    myList.editTask(id, 'prepare food');
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const { desc } = tasks[tasks.length - 1];
    expect(desc).toBe('prepare food');
  });
});

describe('Remove the completed tasks', () => {
  test('Change the status of tasks', () => {
    const task = myList.tasks[myList.tasks.length - 1];
    myList.toggleStatus(task.id);
    const { tasks } = myList;
    expect(tasks[tasks.length - 1].completed).toBe(true);
  });

  test('The new list has only uncompleted tasks', () => {
    const task = myList.tasks[myList.tasks.length - 1];
    const oldLength = myList.tasks.length;
    myList.clearCompleted();
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newLength = tasks.length;
    expect(newLength + 1).toBe(oldLength);
  });
});

describe('Test reOrderTask', () => {
  test('it should remove the item from current location,insert to the new location and update the index in this case we will replace item number 1 in the list with item number 4', () => {
    myList.addTask('finsih testing');
    myList.addTask('get a job');
    const taskId = myList.tasks[0].id;
    const afterId = myList.tasks[3].id;
    myList.reorder(taskId,afterId);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[2].desc).toBe('clean');
  });
});


// describe('Test showTasks', () => {
//   test('it should receive a list and append it to the dom', () => {
//     const dom = new JSDOM('<body><div id="list-tasks"></div></body>');
//     showTasks(dom, myList);
//     console.log(dom.window.document.body.innerHTML);
// });
// });


describe('Test reOrderTask', () => {
  test('it should remove the item from current location,insert to the new location and update the index in this case we will replace item number 1 in the list with item number 4', () => {
    const dom = new JSDOM('<body><div id="list-tasks"></div></body>');
    console.log(dom.window.document.body.innerHTML);
    showTasks(dom, myList);
    console.log(dom.window.document.body.innerHTML);
  });
});