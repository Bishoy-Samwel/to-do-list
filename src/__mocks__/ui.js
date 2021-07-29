const createTaskDiv = (dom, list, task) => {
  const taskDiv = dom.window.document.createElement('div');
  taskDiv.setAttribute('class', 'task-div d-flex draggable');
  taskDiv.setAttribute('draggable', 'true');
  const checkTask = dom.window.document.createElement('input');
  checkTask.setAttribute('type', 'checkbox');
  checkTask.setAttribute('class', 'check-task');
  checkTask.setAttribute('id', task.id);
  const taskDesc = dom.window.document.createElement('input');
  taskDesc.setAttribute('class', 'task-desc');
  taskDesc.setAttribute('value', task.desc);
  taskDesc.onchange = () => {
    list.editTask(task.id, taskDesc.value);
  };
  const delIcon = dom.window.document.createElement('img');
  delIcon.setAttribute('src', 'https://img.icons8.com/windows/32/000000/trash.png');
  delIcon.setAttribute('id', task.id);
  delIcon.setAttribute('class', 'delete');
  // eslint-disable-next-line no-use-before-define
  taskDiv.append(checkTask, taskDesc, delIcon, dotsIcon());
  taskDiv.append(checkTask, taskDesc, delIcon);
  // eslint-disable-next-line no-use-before-define
  // if (task.completed) { toggleCompletedTask(taskDiv); }
  return taskDiv;
};

const dotsIcon = () => {
  const ul = document.createElement('ul');
  ul.setAttribute('id', 'dots');
  let li = document.createElement('li');
  ul.appendChild(li);
  li = document.createElement('li');
  ul.appendChild(li);
  li = document.createElement('li');
  ul.appendChild(li);
  return ul;
};
export default createTaskDiv;