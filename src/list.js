import Task from './task';

export default class List {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || List.initialize();
  }

  static initialize() {
    const task1 = new Task('Eat', 0);
    const task2 = new Task('Rest', 1);
    const task3 = new Task('Sleep', 2);
    return [task1, task2, task3];
  }
}
