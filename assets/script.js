
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');


const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task}
            <button class="delete" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
        // Add the 'new-task' class to the newly added task
        const newlyAddedTask = taskList.lastChild;
        newlyAddedTask.classList.add('new-task');
    }
});


taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        const index = e.target.getAttribute('data-index');
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
});


clearBtn.addEventListener('click', function () {
    localStorage.removeItem('tasks');
    tasks.length = 0;
    displayTasks();
});

