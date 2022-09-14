// Define UI vars
const form = document.querySelector('#task-form');
const formInput = document.querySelector('.form input');
const formDiv = document.querySelector('.form');
const taskInput = document.querySelector('#task');
const filterInput = document.querySelector('#filter');
const listItems = document.querySelector('.list-items');
const clearTask = document.querySelector('.clear');


// Load all event listeners
(function () {
  // Add label has-data class
  formInput.addEventListener('focusin', function (e) {
    formDiv.classList.add('has-data');
  });

  // Remove label has-data class
  formInput.addEventListener('focusout', function (e) {
    if (e.target.value == '') {
      formDiv.classList.remove('has-data');
    }
  });

  // Load LS after pade content
  document.addEventListener('DOMContentLoaded', getItem)

  // Add task to task list
  form.addEventListener('submit', addTask);

  // Reomve task
  listItems.addEventListener('click', removeTask);

  // Clear tasks list
  clearTask.addEventListener('click', clearTasks);

  // Filtering items
  filterInput.addEventListener('keyup', filterTasks);
})();

// Get itme from LS
function getItem() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fa fa-times"></i>';
    li.appendChild(link);
    listItems.appendChild(li);
  })
}

// Add task function
function addTask(e) {
  e.preventDefault();

  // Alart if input is empty
  if (taskInput.value === '') {
    window.alert('Please put ur task');
  }

  // Put Create Task Element
  if (taskInput.value != '') {
    const li = document.createElement('li');
    li.className = 'item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fa fa-times"></i>';
    li.appendChild(link);
    listItems.appendChild(li);
    // Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
  }
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  }

  // Remove task from ls
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove task from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks(e) {
  // listItems.innerHTML = '';

  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
  // Clear tasks from LS
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.item').forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}