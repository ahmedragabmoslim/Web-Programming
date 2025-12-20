let tasks = [];
let filter = 'all';
let deleteId = null;

window.onload = function() {
    loadFromStorage();
    loadTheme();
    showTasks();
};

function loadFromStorage() {
    let saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

function saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTheme() {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('themeBtn').textContent = 'Light Mode';
    }
}

function toggleTheme() {
    let body = document.body;
    let btn = document.getElementById('themeBtn');
    
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        btn.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark');
        btn.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}

function addTask() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    let priority = document.getElementById('priority').value;
    
    if (!title || !desc) {
        alert('Please fill all fields');
        return;
    }
    
    let task = {
        id: Date.now(),
        title: title,
        desc: desc,
        priority: priority
    };
    
    tasks.push(task);
    saveToStorage();
    showTasks();
    
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('priority').value = 'medium';
}

function showTasks() {
    let list = document.getElementById('taskList');
    list.innerHTML = '';
    
    let filtered = tasks;
    if (filter !== 'all') {
        filtered = tasks.filter(function(t) {
            return t.priority === filter;
        });
    }
    
    if (filtered.length === 0) {
        list.innerHTML = '<p>No tasks found</p>';
        return;
    }
    
    for (let i = 0; i < filtered.length; i++) {
        let t = filtered[i];
        let div = document.createElement('div');
        div.className = 'task ' + t.priority;
        div.id = 'task-' + t.id;
        
        div.innerHTML = `
            <div class="task-header">
                <span class="task-title">${t.title}</span>
                <span class="priority-tag ${t.priority}">${t.priority.toUpperCase()}</span>
            </div>
            <div class="task-desc">${t.desc}</div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${t.id})">Edit</button>
                <button class="delete-btn" onclick="showDeleteModal(${t.id})">Delete</button>
            </div>
        `;
        
        list.appendChild(div);
    }
}

function filterTasks(type) {
    filter = type;
    
    let btns = document.getElementsByClassName('filter-btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
    
    event.target.classList.add('active');
    showTasks();
}

function editTask(id) {
    let task = null;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            task = tasks[i];
            break;
        }
    }
    
    let div = document.getElementById('task-' + id);
    div.innerHTML = `
        <input class="edit-input" type="text" value="${task.title}" id="edit-title">
        <textarea class="edit-textarea" id="edit-desc">${task.desc}</textarea>
        <select class="edit-select" id="edit-priority">
            <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
            <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
        </select>
        <div class="task-actions">
            <button class="save-btn" onclick="saveTask(${id})">Save</button>
            <button class="cancel-btn" onclick="showTasks()">Cancel</button>
        </div>
    `;
}

function saveTask(id) {
    let title = document.getElementById('edit-title').value;
    let desc = document.getElementById('edit-desc').value;
    let priority = document.getElementById('edit-priority').value;
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].title = title;
            tasks[i].desc = desc;
            tasks[i].priority = priority;
            break;
        }
    }
    
    saveToStorage();
    showTasks();
}

function showDeleteModal(id) {
    deleteId = id;
    document.getElementById('deleteModal').classList.add('show');
}

function closeModal() {
    deleteId = null;
    document.getElementById('deleteModal').classList.remove('show');
}

function confirmDelete() {
    let newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== deleteId) {
            newTasks.push(tasks[i]);
        }
    }
    tasks = newTasks;
    
    saveToStorage();
    closeModal();
    showTasks();
}