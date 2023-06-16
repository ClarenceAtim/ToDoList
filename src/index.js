import './style.css';
import ListStore, { renderTasks, updateLocalStorage } from './modules/utility.js';

const newListStore = new ListStore();

const listStorage = JSON.parse(localStorage.getItem('lists'));
if (listStorage !== null) {
  newListStore.lists = listStorage;
}

const addText = document.querySelector('.enter-text');

addText.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const newList = {
      id: newListStore.lists.length + 1,
      description: event.target.value,
      completed: false,
    };
    newListStore.add(newList);
    renderTasks(newListStore); // Pass newListStore as the argument
    event.target.value = '';
    updateLocalStorage(newListStore); // Pass newListStore as the argument
  }
});

renderTasks(newListStore); // Pass newListStore as the argument