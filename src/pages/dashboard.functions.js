import { storage } from '@core/utils';

const toHtml = (key) => {
  const model = storage(key);
  const id = key.split(':')[1];
  return `
    <li class="dashboard__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
    </li>
  `;
};

const getAllKeys = () => {
  const keys = [];

  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }

  return keys;
};

export const createRecordsTable = () => {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="dashboard__list-header">
      <span>Название таблицы</span>
      <span>Дата открытия</span>
            </div>
            <ul class="dashboard__list">
              ${keys.map(toHtml).join('')}
            </ul>
  `;
};
