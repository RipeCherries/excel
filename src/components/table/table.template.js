import { defaultStyles } from '@/constants';
import { toInlineStyles } from '@core/utils';
import { parse } from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const createCell = (data, columnIndex, i, width, styles) => {
  return `
    <div 
        class="cell"
        style="${styles}; width: ${width}"
        contenteditable 
        data-type="cell"
        data-column="${columnIndex}" 
        data-id="${i}:${columnIndex}"
        data-value="${data}"
    >${parse(data)}</div>
  `;
};

const createCol = (content, index, width) => {
  return `
    <div class="column" style="width: ${width}" data-type="resizable" data-column="${index}">
      ${content}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `;
};

const createRow = (index, content, height) => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';

  return `
    <div class="row" style="height: ${height}" data-type="resizable" data-row="${index}">
        <div class="row-info">
            ${index ?? ''}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `;
};

export const createTable = (rowsCount = 15, state = {}) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount)
    .fill('')
    .map((_, index) => {
      const width = (state.columnState[index] || DEFAULT_WIDTH) + 'px';
      return createCol(String.fromCharCode(CODES.A + index), index, width);
    })
    .join('');

  const rows = [];

  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; ++i) {
    const cells = new Array(colsCount)
      .fill('')
      .map((_, index) => {
        const width = (state.columnState[index] || DEFAULT_WIDTH) + 'px';
        const data = state.dataState[`${i}:${index}`] || '';
        const styles = toInlineStyles({
          ...defaultStyles,
          ...state.stylesState[`${i}:${index}`]
        });
        return createCell(data, index, i, width, styles);
      })
      .join('');

    const height = (state.rowState[i + 1] || DEFAULT_HEIGHT) + 'px';
    rows.push(createRow(i + 1, cells, height));
  }

  return rows.join('');
};
