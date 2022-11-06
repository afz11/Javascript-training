const todoList = document.querySelector('.todo-list');
const todoItems = todoList.children;
const addTodoButton = document.querySelector('#add-todo');
const todoInput = document.querySelector('.todo-input');

// localStorage.clear();

addTodoButton.addEventListener('click', addTodo);


function addTodo(e) {
    e.preventDefault();
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    

    //Create the todo Item a
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    
    //Create checkButton
    const checkTodoButton = document.createElement('button');
    checkTodoButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    todoDiv.appendChild(checkTodoButton);

    //Create checkButton
    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    todoDiv.appendChild(deleteTodoButton);

    //Append to the list
    todoList.appendChild(todoDiv);



    newTodo.addEventListener('click', deleteTodo);
    todoInput.value = '';

} 

function deleteTodo(e) {
    e.stopPropagation();
    e.target.remove();
    // console.log(`${e.target.innerText} deleted`);
}