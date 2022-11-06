const todoList = document.querySelector('#todo-list');
const items = todoList.children;
const submit = document.querySelector('#submit');
const itemCounter = document.querySelector('h2 b'); 
const title = document.querySelector('.main-title');
const titleChangerDiv = document.querySelector('.title-changer-div');
const nameInput = document.querySelector('.name-input');




submit.addEventListener('click', event => {
    event.preventDefault();
    //Create element
    const newItem = document.createElement("li");
    //Adding Class
    newItem.classList.add("item");
    // Adding text
    newItem.innerText = nameInput.value;
    
    todoList.appendChild(newItem);
    itemCounter.innerText = `${items.length}`;
    //Delete value from the input
    nameInput.value = '';
    //Create the element and attaching the listener
    newItem.addEventListener('click', deleteItem);

    console.log(nameInput)
});



function deleteItem(event) {
    event.stopPropagation(); // Stop Event Bubbling!!
    event.target.remove();
}

todoList.addEventListener('click', ()=> {
    todoList.classList.toggle('fade');
})

//Function declaration 

// function addItem() {
//     const newItem = document.createElement("li");
//     newItem.classList.add("item");
//     newItem.innerText = `Item ${items.length + 1}`;
//     todoList.appendChild(newItem);
//     itemCounter.innerText = `${items.length}`
// }


// function addButton(className, name, parent) {
//     const newButton = document.createElement('button');
//     newButton.classList.add(className);
//     newButton.innerText = name;
//     titleChangerDiv.appendChild(newButton);
// }

// // Create new Button 
// addButton("title-changer", "Click me!", titleChangerDiv);
// const changeButton = document.querySelector('.title-changer');

// changeButton.addEventListener("click", function() {
//     title.classList.toggle('big-and-red');
// });


