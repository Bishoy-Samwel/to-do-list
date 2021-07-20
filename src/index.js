import List from './list';
import './style.css';

const list = new List();

const createTaskDiv = (task) => {
  const taskDiv = document.createElement('div');
  taskDiv.setAttribute('class', 'task-div d-flex');
  const checkTask = document.createElement('input');
  checkTask.setAttribute('type', 'checkbox');
  checkTask.setAttribute('class', 'check-task');
  checkTask.setAttribute('id', task.id);
  const taskDesc = document.createElement('input');
  taskDesc.setAttribute('class', 'task-desc');
  taskDesc.setAttribute('value', task.desc);
  const delIcon = document.createElement('img');
  delIcon.setAttribute('src', 'https://img.icons8.com/windows/32/000000/trash.png');
  delIcon.setAttribute('id', task.id);
  delIcon.setAttribute('class', 'delete');
  taskDiv.append(checkTask, taskDesc, delIcon);
  return taskDiv;
};

const showTasks = (tasks) => {
  const tasksSection = document.querySelector('#list-tasks');
  const tasksDiv = document.createElement('div');
  tasksDiv.setAttribute('class', 'd-flex');
  tasksDiv.setAttribute('id', 'tasks-div');
  tasks.forEach((task) => {
    tasksDiv.appendChild(createTaskDiv(task));
  });
  tasksSection.innerHTML = '';
  tasksSection.appendChild(tasksDiv);
};

showTasks(list.tasks);