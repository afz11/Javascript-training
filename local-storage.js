// LOCAL STORAGE

const myTodoList = ['Feed the cat', 'wash', 'Watch TV'];

localStorage.setItem('Todo', JSON.stringify(myTodoList));

const retrieved = JSON.parse(localStorage.getItem('Todo'));

console.log(retrieved)