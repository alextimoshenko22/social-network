import { authAPI, securityAPI } from "../api/api";

//Редьюсер авторизации
const SET_USER_DATA = "SET-USER-DATA";
const SET_SERVER_AUTH_ERROR = "SET-SERVER-AUTH-ERROR";
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  error: "",
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SERVER_AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const setServerError = (error) => ({
  type: SET_SERVER_AUTH_ERROR,
  error,
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payoad: { captchaUrl }
});

export const getAuthUserData = () => (dispatch) => {
  return authAPI.authMe().then((data) => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    console.log(data.messages[0]);
    dispatch(setServerError(data.messages[0]));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
