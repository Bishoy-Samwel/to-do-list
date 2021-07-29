import createTaskDiv from './__mocks__/ui';
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

describe('test the removeTaks function', () => {
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

// test('Add one new item to the list', () => {
//     document.body.innerHTML =
//     '<div>' +
//     '  <ul id="list"></li>' +
//     '</div>';
//     addItem();
//     const list = document.querySelectorAll('#list li');
//     expect(list).toHaveLength(1);
// });



// const createTaskDiv = (list, task) => {
//   const taskDiv = document.createElement('div');
//   taskDiv.setAttribute('class', 'task-div d-flex draggable');
//   taskDiv.setAttribute('draggable', 'true');
//   const checkTask = document.createElement('input');
//   checkTask.setAttribute('type', 'checkbox');
//   checkTask.setAttribute('class', 'check-task');
//   checkTask.setAttribute('id', task.id);
//   const taskDesc = document.createElement('input');
//   taskDesc.setAttribute('class', 'task-desc');
//   taskDesc.setAttribute('value', task.desc);
//   taskDesc.onchange = () => {
//     list.editTask(task.id, taskDesc.value);
//   };
//   const delIcon = document.createElement('img');
//   delIcon.setAttribute('src', 'https://img.icons8.com/windows/32/000000/trash.png');
//   delIcon.setAttribute('id', task.id);
//   delIcon.setAttribute('class', 'delete');
//   taskDiv.append(checkTask, taskDesc, delIcon, dotsIcon());
//   if (task.completed) { toggleCompletedTask(taskDiv); }
//   return taskDiv;
// };