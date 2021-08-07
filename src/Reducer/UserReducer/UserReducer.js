import {template} from '@babel/core';
import user_types from './user_types';
const initialState = {
  login_token: '',
  user_id: '',
  mo_number: '',
  user_name: '',
  business_name: '',
  email: '',
  add_pushnotification_token: '',
  address: '',
  vat_no: '',
  org_no: '',
  referral_code: '',
  intro_status: false,
  time_date: '',
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case user_types.LOGIN_TOKEN:
      return {
        ...state,
        login_token: action.payload,
      };
    case user_types.USER_ID:
      return {
        ...state,
        user_id: action.payload,
      };
    case user_types.USER_NAME:
      return {
        ...state,
        user_name: action.payload,
      };
    case user_types.BUSINESS_NAME:
      return {
        ...state,
        business_name: action.payload,
      };
    case user_types.EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case user_types.MO_NUMBER:
      return {
        ...state,
        mo_number: action.payload,
      };
    case user_types.ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case user_types.VAT_NO:
      return {
        ...state,
        vat_no: action.payload,
      };
    case user_types.ORG_NO:
      return {
        ...state,
        org_no: action.payload,
      };
    case user_types.REFERRAL_CODE:
      return {
        ...state,
        referral_code: action.payload,
      };
    case user_types.INTRO_STSTUS:
      return {
        ...state,
        intro_status: action.payload,
      };

    case user_types.TIMEDATE:
      return {
        ...state,
        time_date: action.payload,
      };

    case user_types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default UserReducer;
