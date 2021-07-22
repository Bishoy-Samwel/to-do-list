import showTasks from './ui';
import List from './list';
import './style.css';

const list = new List();

window.addEventListener('DOMContentLoaded', () => {
  showTasks(list);
});