import List from './list';
jest.mock('./list');
const myList = new List();
describe('test the addTask function', () => {
  test('should add a task', () => {
    myList.addTask('clean');
    const tasks = myList.tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[0].desc).toBe('clean');
  });

  test('should update the tasks description', () => {
    myList.addTask('wash car');
    const tasks = myList.tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks[1].desc).toBe('wash car');
  });
});

describe('test the removeTaks function', () => {
  test('should remove a task', () => {
    const id = myList.tasks[myList.tasks.length - 1].id;
    myList.removeTask(id);
    const tasks = myList.tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks.length).toBe(1);
  });
});

// test the function that is being used by addTask function and removeTask function
describe('test the updateItemsIndex function', () => {
  test('should update the index of  a task', () => {
    myList.addTask('code');
    myList.addTask('buy stocks');
    myList.updateItemsIndex();
    expect(myList.tasks[2].index).toBe(2);
  });
});
