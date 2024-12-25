import { range } from '@core/utils';

export const shouldResize = (event) => {
  return event.target.dataset.resize;
};

export const isCell = (event) => {
  return event.target.dataset.type === 'cell';
};

export const matrix = (current, target) => {
  const columns = range(current.column, target.column);
  const rows = range(current.row, target.row);

  return columns.reduce((acc, column) => {
    rows.forEach((row) => acc.push(`${row}:${column}`));
    return acc;
  }, []);
};

export const nextSelector = (key, { column, row }) => {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      column++;
      break;
    case 'ArrowLeft':
      column = column - 1 < 0 ? 0 : column - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < 0 ? 0 : row - 1;
      break;
  }

  return `[data-id="${row}:${column}"]`;
};
