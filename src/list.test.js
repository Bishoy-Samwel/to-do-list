jest.mock('./__mocks__/listMock');

const List = require('./list');

const list = new List();
test('should create a list', () => {
  expect(list.tasks.length).toBe(0);
});
