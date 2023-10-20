document.addEventListener('DOMContentLoaded', function() {
    function checkLogin() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            window.location.href = '../login.html';
        }
        return loggedInUser;
    }

    function loadTasks() {
        const loggedInUser = checkLogin();
        const tasks = JSON.parse(localStorage.getItem(loggedInUser)) || [];
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            let taskNameContent = `<strong>${task.name}</strong> | ${task.date} | ${task.description}`;
            
            if (task.completed) {
                li.classList.add('completed-task');
                taskNameContent = `<del>${taskNameContent}</del>`;
            }

            li.innerHTML = `${taskNameContent} <button class="edit-task" data-index="${index}">Editar</button> <button class="delete-task" data-index="${index}">Excluir</button> <button class="complete-task" data-index="${index}" ${task.completed ? 'disabled' : ''}>Concluir</button>`;
            taskList.appendChild(li);
        });

        const editButtons = document.querySelectorAll('.edit-task');
        const deleteButtons = document.querySelectorAll('.delete-task');
        const completeButtons = document.querySelectorAll('.complete-task');

        editButtons.forEach(button => {
            button.addEventListener('click', editTask);
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteTask);
        });

        completeButtons.forEach(button => {
            button.addEventListener('click', completeTask);
        });
    }

    function addTask(name, date, description) {
        const loggedInUser = checkLogin();
        const tasks = JSON.parse(localStorage.getItem(loggedInUser)) || [];
        tasks.push({name, date, description, completed: false});
        localStorage.setItem(loggedInUser, JSON.stringify(tasks));
        loadTasks();
    }

    function editTask() {
        const loggedInUser = checkLogin();
        const index = this.getAttribute('data-index');
        const tasks = JSON.parse(localStorage.getItem(loggedInUser)) || [];
        const newName = prompt('Novo nome da tarefa:');
        const newDate = prompt('Nova data da tarefa (AAAA-MM-DD):');
        const newDescription = prompt('Nova descrição da tarefa:');
        if (newName !== null && newDate !== null && newDescription !== null) {
            tasks[index].name = newName;
            tasks[index].date = newDate;
            tasks[index].description = newDescription;
            localStorage.setItem(loggedInUser, JSON.stringify(tasks));
            loadTasks();
        }
    }

    function deleteTask() {
        const loggedInUser = checkLogin();
        const index = this.getAttribute('data-index');
        const tasks = JSON.parse(localStorage.getItem(loggedInUser)) || [];
        tasks.splice(index, 1);
        localStorage.setItem(loggedInUser, JSON.stringify(tasks));
        loadTasks();
    }

    function completeTask() {
        const loggedInUser = checkLogin();
        const index = this.getAttribute('data-index');
        const tasks = JSON.parse(localStorage.getItem(loggedInUser)) || [];
        tasks[index].completed = true;
        localStorage.setItem(loggedInUser, JSON.stringify(tasks));
        loadTasks();
    
        this.disabled = true;
        this.style.backgroundColor = '#ccc';
    }
    

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = '../login.html';
    });

    const addTaskButton = document.getElementById('add-task');
    addTaskButton.addEventListener('click', () => {
        const taskName = document.getElementById('task-name').value;
        const taskDate = document.getElementById('task-date').value;
        const taskDescription = document.getElementById('task-description').value;
        if (taskName && taskDate && taskDescription) {
            addTask(taskName, taskDate, taskDescription);
        }
    });

    loadTasks();
});
