import './style.css';

const lists = [
  {
    index: 1,
    description: 'wash clothes',
    completed: false,
  },
  {
    index: 2,
    description: 'wash plates',
    completed: false,
  },
  {
    index: 3,
    description: 'create to do list',
    completed: false,
  },
];

const tasks = document.querySelector('.tasks');
const mappedLists = lists.map((item) => `<li>
                <div class="task-list">
                    <span><i class="fa-regular fa-square"></i></span>
                    <p>${item.description}</p>
                </div>
                <?xml version="1.0" encoding="utf-8"?>
                <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="17.5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="6.5" r="1.5" />
                </svg>
            </li>`);

tasks.innerHTML = mappedLists.join('');
