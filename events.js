const todoList = document.querySelector('#todo-list');
const items = todoList.children;
const submit = document.querySelector('#submit');
const itemCounter = document.querySelector('h2 b'); 

submit.addEventListener('click', addItem);


function addItem(e) {
    const newItem = document.createElement("li");
    newItem.classList.add("item");
    newItem.innerText = `Item ${items.length + 1}`;
    todoList.appendChild(newItem);
    itemCounter.innerText = `${items.length}`
}

