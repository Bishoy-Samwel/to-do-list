import { indexOf } from 'lodash';
import Task from './task';

export default class List {
  constructor() {
    this.orderChanged = false;
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || List.initialize();
  }

  static initialize() {
    const task1 = new Task('task 0', 0);
    const task2 = new Task('task 1', 1);
    const task3 = new Task('task 2', 2);
    const task4 = new Task('task 3', 3);
    const task5 = new Task('task 4', 4);
    return [task1, task2, task3, task4, task5];
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  toggleStatus(id) {
    const task = this.getTask(id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  reorder(taskId, afterId) {
    const current = this.getTask(parseInt(taskId, 10));
    const next = this.getTask(parseInt(afterId, 10));
    this.tasks.splice(current.index, 1);
    console.log(next);
    if (next) {
    const nextIndex = next.index < current.index ? next.index : next.index - 1;
      if (nextIndex > 0) {
        window.alert(`next value is ${next.desc} and its index is ${next.index}`);
        this.tasks.splice(nextIndex, 0, current);
      } else if (next.index === 0) {
        // down to top edge
        this.tasks.unshift(current);
      }
    } else {
      window.alert('top to down edge')
      this.tasks.push(current);
    }
    this.tasks.forEach((task) => {
      task.index = this.tasks.indexOf(task);
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
