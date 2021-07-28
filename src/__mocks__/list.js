import Task from './task';

export default class List {
  constructor() {
    this.orderChanged = false;
    this.tasks = [];
  }

  addTask(desc) {
    const task = new Task(desc, this.tasks.length);
    this.tasks.push(task);
  }
}
