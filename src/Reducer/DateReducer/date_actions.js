import date_types from './date_types';

export const addDate = payload => ({
  type: date_types.DATE,
  payload,
});
export const addTime = payload => ({
  type: date_types.TIME,
  payload,
});
export const addMethodName = payload => ({
  type: date_types.METHODNAME,
  payload,
});

export const addInqTab = payload => ({
  type: date_types.INQTAB,
  payload,
});
