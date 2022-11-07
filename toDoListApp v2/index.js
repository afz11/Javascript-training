const todoInput = document.querySelector('.todo-input');
const submit = document.querySelector('#submit');
const todosList = document.querySelector('.todos');

//eventListeneres
submit.addEventListener('click', addTodo)



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

    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    todoDiv.appendChild(checkButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    todoDiv.appendChild(deleteButton);

    todosList.appendChild(todoDiv);
}

