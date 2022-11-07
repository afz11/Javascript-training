const todoList = document.querySelector('.todo-list');
const todoItems = todoList.children;
const addTodoButton = document.querySelector('#add-todo');
const todoInput = document.querySelector('.todo-input');
const filterOption = document.querySelector('.filter-todo');




// localStorage.clear();


//EventListeners
addTodoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);


function addTodo(e) {
    e.preventDefault();
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    

    //Create the todo Item a
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //Add to localStorage
    saveLocalTodos(todoInput.value);
    
    //Create checkButton
    const checkTodoButton = document.createElement('button');
    checkTodoButton.classList.add('check-button');
    checkTodoButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    todoDiv.appendChild(checkTodoButton);

    //Create deleteButton
    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.classList.add('delete-button');
    deleteTodoButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    todoDiv.appendChild(deleteTodoButton);

    //Append to the list
    todoList.appendChild(todoDiv);



    todoInput.value = '';
} 

function checkDelete(e) {
    e.stopPropagation();
    const item = e.target;
    const todo = item.parentElement;



    if (item.classList[0] === "check-button"){ 
        todo.classList.toggle('completed')
    }

    if (item.classList[0] === "delete-button"){ 
        todo.remove();
        removeLocalTodos(todo);
    }

    // console.log(`${e.target.innerText} deleted`);
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }   
    })

}

function saveLocalTodos(todo) {
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = []; 
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; 
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    

    //Create the todo Item a
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
        
    //Create checkButton
    const checkTodoButton = document.createElement('button');
    checkTodoButton.classList.add('check-button');
    checkTodoButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    todoDiv.appendChild(checkTodoButton);

    //Create deleteButton
    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.classList.add('delete-button');
    deleteTodoButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    todoDiv.appendChild(deleteTodoButton);
    
    //Append to the list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; 
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex)
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos))
}

