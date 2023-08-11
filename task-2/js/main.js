// Получаем элементы DOM
const taskInput = document.getElementById('taskInput');
const createTaskBtn = document.getElementById('createTaskBtn');
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const viewTrashBtn = document.getElementById('viewTrashBtn');
const selectAllCheckbox = document.getElementById('selectAllCheckbox');
const tasksContainer = document.getElementById('tasks');
const trashContainer = document.getElementById('trashContainer');
const restoreTasksBtn = document.getElementById('restoreTasksBtn');
const trashTasksContainer = document.getElementById('trashTasks');

// События реагирования
createTaskBtn.addEventListener('click', createTask);
deleteSelectedBtn.addEventListener('click', deleteSelectedTasks);
viewTrashBtn.addEventListener('click', toggleTrashView);
selectAllCheckbox.addEventListener('change', selectAllTasks);
restoreTasksBtn.addEventListener('click', restoreAllTasks);

// Массив для хранения задач
let tasks = [];
let trashTasks = [];

// Функция создания новой задачи
function createTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        checked: false,
    };

    tasks.push(task);
    renderTasks();

    taskInput.value = '';
}

// Функция для отображения задач
function renderTasks() {
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
      <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.checked ? 'checked' : ''}>
      <span class="task-text ${task.checked ? 'completed' : ''}" data-index="${index}">${task.text}</span>
      <button class="delete-task-btn" data-index="${index}">Удалить</button>
    `;
        const checkbox = taskElement.querySelector('.task-checkbox');
        const taskText = taskElement.querySelector('.task-text');
        const deleteBtn = taskElement.querySelector('.delete-task-btn');

        checkbox.addEventListener('change', () => toggleTaskChecked(index));
        taskText.addEventListener('click', () => toggleTaskChecked(index));
        deleteBtn.addEventListener('click', () => deleteTask(index));

        tasksContainer.appendChild(taskElement);
    });
}

// Функция для переключения состояния задачи (выделено/не выделено)
function toggleTaskChecked(index) {
    tasks[index].checked = !tasks[index].checked;
    renderTasks();
}

// Функция для удаления задачи
function deleteTask(index) {
    const deletedTask = tasks.splice(index, 1)[0];
    trashTasks.push(deletedTask);
    renderTasks();
}

// Функция удаления выбранной задачи
function deleteSelectedTasks() {
    const newTasks = tasks.filter(task => !task.checked);
    trashTasks = trashTasks.concat(tasks.filter(task => task.checked));
    tasks = newTasks;
    renderTasks();
}

// Функция для отображения задач и скрытия корзины
function showTrash() {
    renderTrashTasks();
    tasksContainer.classList.add('hidden');
    trashContainer.classList.remove('hidden');
}

// Ф-ция отображение задачи
function showTasks() {
    tasksContainer.classList.remove('hidden');
    trashContainer.classList.add('hidden');
    viewTrashBtn.textContent = 'Корзина';
}

// Функция для переключения между просмотром задач и корзиной
function toggleTrashView() {
    if (tasksContainer.classList.contains('hidden')) {
        showTasks();
    } else {
        showTrash();
    }
}

// Рендер корзины
function renderTrashTasks() {
    trashTasksContainer.innerHTML = '';
    trashTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
      <span>${task.text}</span>
      <button class="restore-task-btn" data-index="${index}">Восстановить</button>
    `;
        const restoreBtn = taskElement.querySelector('.restore-task-btn');
        restoreBtn.addEventListener('click', () => restoreTask(index));
        trashTasksContainer.appendChild(taskElement);
    });
}

// Функция для восстановления задачи
function restoreTask(index) {
    const restoredTask = trashTasks.splice(index, 1)[0];
    tasks.push(restoredTask);
    renderTrashTasks();
    renderTasks();
}

// Функция для восстановления всех задач
function restoreAllTasks() {
    tasks = [...tasks, ...trashTasks];
    trashTasks = [];
    renderTrashTasks();
    renderTasks();
    tasksContainer.classList.remove('hidden');
    trashContainer.classList.add('hidden');
}

function selectAllTasks() {
    const isChecked = selectAllCheckbox.checked;
    tasks.forEach(task => {
        task.checked = isChecked;
    });
    renderTasks();
}
