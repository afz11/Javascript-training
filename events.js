const todoList = document.querySelector('#todo-list');
const items = todoList.children;
const submit = document.querySelector('#submit');
const itemCounter = document.querySelector('h2 b'); 
const title = document.querySelector('.main-title');
const titleChangerDiv = document.querySelector('.title-changer-div');




submit.addEventListener('click', () => {
    const newItem = document.createElement("li");
    newItem.classList.add("item");
    newItem.innerText = `Item ${items.length + 1}`;
    todoList.appendChild(newItem);
    itemCounter.innerText = `${items.length}`
});

//Function declaration 

// function addItem() {
//     const newItem = document.createElement("li");
//     newItem.classList.add("item");
//     newItem.innerText = `Item ${items.length + 1}`;
//     todoList.appendChild(newItem);
//     itemCounter.innerText = `${items.length}`
// }


function addButton(className, name, parent) {
    const newButton = document.createElement('button');
    newButton.classList.add(className);
    newButton.innerText = name;
    titleChangerDiv.appendChild(newButton);
}

// Create new Button 
addButton("title-changer", "Click me!", titleChangerDiv);
const changeButton = document.querySelector('.title-changer');

changeButton.addEventListener("keydown", function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 81) {
        title.classList.toggle('big-and-red');
    }

});


