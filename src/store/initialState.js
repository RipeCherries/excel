import { clone, storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  columnState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

export const normalizeInitialState = (state) => {
  return state ? normalize(state) : clone(defaultState);
};
