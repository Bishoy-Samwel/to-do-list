import Task from '../task';

class List {
  constructor() {
    this.orderChanged = false;
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }
}
module.exports = List;