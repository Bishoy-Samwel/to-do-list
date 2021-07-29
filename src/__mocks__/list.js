import Task from './task';

export default class List {
  constructor() {
    this.orderChanged = false;
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask(desc) {
    const task = new Task(desc, this.tasks.length);
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // used by the original add task
  updateItemsIndex() {
    this.tasks.forEach((task) => {
      task.index = this.tasks.indexOf(task);
    });
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(id, desc) {
    const task = this.tasks.find((task) => task.id === id);
    task.desc = desc;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
