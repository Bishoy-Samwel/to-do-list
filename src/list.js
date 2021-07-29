import Task from './task';

export default class List {
  constructor() {
    this.orderChanged = false;
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  toggleStatus(id) {
    const task = this.getTask(id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateItemsIndex() {
    this.tasks.forEach((task) => {
      task.index = this.tasks.indexOf(task);
    });
  }

  addTask(desc) {
    const task = new Task(desc, this.tasks.length);
    this.tasks.push(task);
    this.updateItemsIndex();
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.updateItemsIndex();
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(id, desc) {
    const task = this.getTask(id);
    task.desc = desc;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task) => task.completed !== true);
    this.updateItemsIndex();
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  reorder(taskId, afterId) {
    const current = this.getTask(parseInt(taskId, 10));
    const next = this.getTask(parseInt(afterId, 10));
    this.tasks.splice(current.index, 1);
    if (next) {
      const nextIndex = next.index < current.index ? next.index : next.index - 1;
      if (nextIndex > 0) {
        this.tasks.splice(nextIndex, 0, current);
      } else if (next.index === 0) {
        // down to top edge
        this.tasks.unshift(current);
      }
    } else {
      // top to down edge
      this.tasks.push(current);
    }
    this.updateItemsIndex();
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}