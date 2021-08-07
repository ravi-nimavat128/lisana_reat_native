import {template} from '@babel/core';
import date_types from './date_types';
const initialState = {
  date: '',
  time: '',
  method_name: '',
  inq_tab: 0,
};
const DateReducer = (state = initialState, action) => {
  switch (action.type) {
    case date_types.DATE:
      return {
        ...state,
        date: action.payload,
      };
    case date_types.TIME:
      return {
        ...state,
        time: action.payload,
      };
    case date_types.METHODNAME:
      return {
        ...state,
        method_name: action.payload,
      };
    case date_types.INQTAB:
      return {
        ...state,
        inq_tab: action.payload,
      };

    default:
      return state;
  }
};

export default DateReducer;
