import './style.css';

const myTodo = [
  { description: 'Going to the GYM', completed: true, index: 1 },
  { description: 'Cleaning my Room', completed: false, index: 2 },
  { description: 'Going for a wa;k', completed: true, index: 3 },
  { description: 'Coding for 4 hours', completed: false, index: 4 },
];
const list = document.getElementById('list');
// Sorting the array first
myTodo.sort((a, b) => a.index - b.index);

myTodo.forEach((value) => {
  // Creating list of to-do
  const li = document.createElement('li');
  li.innerHTML = `
        ${value.description}<i class="fa-solid fa-ellipsis-vertical"></i>
    `;
  list.appendChild(li);
});