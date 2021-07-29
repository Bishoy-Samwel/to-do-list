// class Task {
//   constructor(desc, index) {
//     this.desc = desc;
//     this.completed = false;
//     this.index = index;
//     this.id = Task.generateID();
//   }

//   static generateID = () => Math.floor(Math.random() * 100000);
// }

class List {
  constructor() {
    this.orderChanged = false;
    // because we are testing the add method here the tasks can be empty and there is no need
    // to use the local storage
    this.tasks = [];
  }

  addTask(desc) {
    const task = new Task(desc, this.tasks.length);
    this.tasks.push(task);
  }
}

describe('tst the add remove function', () => {
  test('should add a task', () => {
    const list = new List();
    list.addTask('clean');
    expect(list.tasks.length).toBe(1);
  });

  test('should add a task', () => {
    const list = new List();
    list.addTask('clean');
    expect(list.tasks[0].desc).toBe('clean');
  });
});
