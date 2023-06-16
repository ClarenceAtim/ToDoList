export default class ListStore {
  constructor() {
    this.lists = [];
  }

  add(list) {
    this.lists.push(list);
  }

  remove(itemId) {
    this.lists = this.lists.filter((item) => item.id !== itemId);
  }
}

export const updateLocalStorage = (newListStore) => {
  localStorage.setItem('lists', JSON.stringify(newListStore.lists));
};

const tasks = document.querySelector('.tasks');
export const renderTasks = (listInstance) => {
  const mappedLists = listInstance.lists.map((item) => {
    const trashBox = item.completed ? '<i class="fa-regular fa-trash-can trash-box"></i>' : '';
    return `<li class="task-items" data-item-id="${item.id}">
            <div class="task-list">
                <span><i class="fa-regular fa-square unchecked"></i></span>
                <input class="activities" type="text" value="${item.description}" >
            </div>
            <div class="dot-hover">
                ${trashBox}
                ${item.completed ? '' : '<svg class="three-dot" fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="17.5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="6.5" r="1.5" /></svg>'}
            </div>
        </li>`;
  });

  tasks.innerHTML = mappedLists.join('');
  const taskItems = document.querySelectorAll('.task-items');

  taskItems.forEach((item) => {
    const activities = item.querySelector('.activities');
    const dotHover = item.querySelector('.dot-hover');
    const trashBox = dotHover.querySelector('.fa-regular.fa-trash-can');
    const svgElement = dotHover.querySelector('svg');

    activities.addEventListener('click', () => {
      item.classList.toggle('delete');
      dotHover.classList.toggle('fa-regular');
      dotHover.classList.toggle('fa-trash-can');

      if (trashBox) {
        trashBox.style.display = item.classList.contains('delete') ? 'block' : 'none';
      }
      if (svgElement) {
        svgElement.style.display = item.classList.contains('delete') ? 'none' : 'block';
      }
      updateLocalStorage(listInstance); // Pass listInstance as the argument
    });

    activities.addEventListener('input', () => {
      const itemId = parseInt(item.dataset.itemId, 10);
      const updatedDescription = activities.value;
      const itemIndex = listInstance.lists.findIndex((item) => item.id === itemId);

      if (updatedDescription !== '') {
        listInstance.lists[itemIndex].description = updatedDescription;
        updateLocalStorage(listInstance); // Pass listInstance as the argument
      }
    });
  });

  const uncheckedItems = document.querySelectorAll('.unchecked');

  uncheckedItems.forEach((unchecked) => {
    unchecked.addEventListener('click', (event) => {
      unchecked.completed = true;
      unchecked.classList.toggle('fa-solid');
      unchecked.classList.toggle('fa-check');
      event.target.closest('.task-list').classList.toggle('checked');
      updateLocalStorage(listInstance); // Pass listInstance as the argument
    });
  });

  tasks.addEventListener('click', (event) => {
    const trashBox = event.target.closest('.fa-regular.fa-trash-can');
    if (trashBox) {
      event.stopPropagation();
      const taskItem = event.target.closest('.task-items');
      if (taskItem) {
        const itemId = parseInt(taskItem.dataset.itemId, 10);
        listInstance.remove(itemId);
        renderTasks(listInstance);
        updateLocalStorage(listInstance);
      }
    }
  });
};