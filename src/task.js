export default class Task {
  constructor(desc, index) {
    this.desc = desc;
    this.completed = false;
    this.index = index;
    this.id = Task.generateID();
  }

  static generateID = () => Math.floor(Math.random() * 100000);
}
