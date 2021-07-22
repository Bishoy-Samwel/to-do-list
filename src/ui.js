function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const drag = (list) => {
  const draggables = document.querySelectorAll('.task-div ');
  const container = document.querySelector('.container');
  let taskId;
  let afterId;
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
      taskId = draggable.querySelector('.check-task').getAttribute('id');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      list.reorder(taskId, afterId);
    });
  });
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(draggable);
      afterId = null;
    } else {
      afterId = afterElement.querySelector('.check-task').getAttribute('id');
      container.insertBefore(draggable, afterElement);
    }
    taskId = draggable.querySelector('.check-task').getAttribute('id');
  });
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

const toggleCompletedTask = (taskDiv, completed = true) => {
  if (completed) {
    taskDiv.querySelector('.task-desc').classList.add('done');
    taskDiv.querySelector('.check-task').setAttribute('checked', 'checked');
    taskDiv.classList.add('bg-yellow');
  } else {
    taskDiv.querySelector('.task-desc').classList.remove('done');
    taskDiv.classList.remove('bg-yellow');
  }
};

const onClick = (list) => {
  document.querySelector('#list-tasks').onclick = (event) => {
    if (event.target.classList.value.includes('delete')) {
      const { id } = event.target;
      list.removeTask(parseInt(id, 10));
      event.target.parentElement.remove();
    } else if (event.target.className === 'check-task') {
      const { id } = event.target;
      list.toggleStatus(parseInt(id, 10));
      toggleCompletedTask(event.target.parentElement, list.getTask(parseInt(id, 10)).completed);
    } else if (event.target.classList.value.includes('task-desc')) {
      // eslint-disable-next-line no-unused-expressions
      (document.querySelector('.bg-red')) ? document.querySelector('.bg-red').classList.remove('bg-red') : 1;
      event.target.parentElement.classList.add('bg-red');
    }
  };
};

const createTaskDiv = (task) => {
  const taskDiv = document.createElement('div');
  taskDiv.setAttribute('class', 'task-div d-flex draggable');
  taskDiv.setAttribute('draggable', 'true');
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
  taskDiv.append(checkTask, taskDesc, delIcon, dotsIcon());
  if (task.completed) { toggleCompletedTask(taskDiv); }
  return taskDiv;
};

export default function showTasks(list) {
  onClick(list);
  const tasksSection = document.querySelector('#list-tasks');
  const tasksDiv = document.createElement('div');
  tasksDiv.setAttribute('class', 'd-flex container');
  tasksDiv.setAttribute('id', 'tasks-div');
  list.tasks.forEach((task) => {
    tasksDiv.appendChild(createTaskDiv(task));
  });
  tasksSection.innerHTML = '';
  tasksSection.appendChild(tasksDiv);
  drag(list);
}
