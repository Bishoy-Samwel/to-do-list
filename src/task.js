export default class Task {
  constructor(desc, index) {
    this.desc = desc;
    this.completed = false;
    this.id = index;
  }
}
