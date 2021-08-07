import user_types from './user_types';

export const addUserId = payload => ({
  type: user_types.USER_ID,
  payload,
});
export const addUserName = payload => ({
  type: user_types.USER_NAME,
  payload,
});
export const addBusiness_name = payload => ({
  type: user_types.BUSINESS_NAME,
  payload,
});
export const addIntroStatus = payload => ({
  type: user_types.INTRO_STSTUS,
  payload,
});

export const addMobile_no = payload => ({
  type: user_types.MO_NUMBER,
  payload,
});

export const addEmail = payload => ({
  type: user_types.EMAIL,
  payload,
});
export const addVAT_no = payload => ({
  type: user_types.VAT_NO,
  payload,
});
export const addORG_no = payload => ({
  type: user_types.ORG_NO,
  payload,
});
export const addAddress = payload => ({
  type: user_types.ADDRESS,
  payload,
});

export const addReferral_code = payload => ({
  type: user_types.REFERRAL_CODE,
  payload,
});

export const addLoginToken = payload => ({
  type: user_types.LOGIN_TOKEN,
  payload,
});
export const addTimeDate = payload => ({
  type: user_types.TIMEDATE,
  payload,
});
export const LogOut = payload => ({
  type: user_types.LOGOUT,
  payload,
});
