import List from './list';

jest.mock('./list');
describe('tst the add remove function', () => {
  test('should add a task', () => {
    const myList = new List();
    myList.addTask('clean');
    expect(myList.tasks.length).toBe(1);
  });

  test('should add a task', () => {
    const myList = new List();
    myList.addTask('clean');
    expect(myList.tasks[0].desc).toBe('clean');
  });
});
