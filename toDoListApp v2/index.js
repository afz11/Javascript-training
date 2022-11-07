const todoInput = document.querySelector('.todo-input');
const submit = document.querySelector('#submit');
const todosList = document.querySelector('.todos');
const filterOption = document.querySelector('.filter-options');

//eventListeneres
submit.addEventListener('click', addTodo)
todosList.addEventListener('click', checkOrDelete);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', loadFromLocalStorage)



//Functions
function addTodo(e) {
    e.preventDefault();

    //Create a div with a list element and two buttons
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText = `${todoInput.value}`;
    todoDiv.appendChild(todoItem);

    saveToLocalStorage(todoInput.value);

    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    todoDiv.appendChild(checkButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    todoDiv.appendChild(deleteButton);

    todosList.appendChild(todoDiv);

    todoInput.value = '';
}

function checkOrDelete(e) {
    const button = e.target;
    const todoItem = button.parentElement;

    if(button.classList.contains('check-button')){
        todoItem.classList.toggle('completed')
    }

    if(button.classList[0] === "delete-button") {
        todoItem.classList.add('fall');
        removeLocalTodos(todoItem);
        todoItem.addEventListener('transitionend', e => {
            todoItem.remove();
        })
        
        
    }
}

function filterTodo(e) {
    const todos = todosList.childNodes;
    const filterStatus = e.target.value; 

    todos.forEach(todo => {
        switch(filterStatus){
            case "all":
                todo.style.display= "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display= "flex"
                } else {
                    todo.style.display= "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display= "flex"
                } else {
                    todo.style.display= "none"
                }
                break;
        }
    })
}

function saveToLocalStorage(todo) {
    let todos = checkLocal();

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function loadFromLocalStorage(){

    let todos = checkLocal();
    
    todos.forEach(todo => {
        //Create a div with a list element and two buttons
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerText = todo;
        todoDiv.appendChild(todoItem);

        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        todoDiv.appendChild(checkButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        todoDiv.appendChild(deleteButton);

        todosList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos = checkLocal();

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function checkLocal(){
    let todos;
    if(localStorage.getItem('todos') === null) {
        return todos = [];
    } else {
        return todos = JSON.parse(localStorage.getItem('todos'));
    }
}

