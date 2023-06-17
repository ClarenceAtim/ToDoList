import { updateItemInLocalStorage, deleteItemFromLocalStorage } from './utility.js';

class UI {
  dispayItems(items) {
    this.items = items;
    const tasks = document.querySelector('.tasks');
    const list = document.createElement('li');
    list.className = 'list';
    list.id = items.index;
    list.innerHTML = `
      <div class="list-item">
        <input type="checkbox" class="list__item--checkbox">
        <input type="text" class="edit" value="${items.description}">
      </div>
      <button id="${items.index}" class="list__item--delete"><i class="fa fa-trash-alt"></i></button>
    `;
    tasks.appendChild(list);

    const checkbox = list.querySelector('.list__item--checkbox');
    const edit = list.querySelector('.edit');
    const deleteBtn = list.querySelector('.list__item--delete');

    checkbox.addEventListener('change', () => {
      // Update the status of the task
      items.completed = !items.completed;

      if (items.completed === true) {
        edit.style.textDecoration = 'line-through';
        checkbox.checked = true;
      } else {
        edit.style.textDecoration = 'none';
        checkbox.checked = false;
      }

      // Update the task in the localStorage
      updateItemInLocalStorage(items.index, items);
    });

    deleteBtn.addEventListener('click', () => {
      list.remove();
      deleteItemFromLocalStorage(items.index);
    });
  }
}

export default UI;