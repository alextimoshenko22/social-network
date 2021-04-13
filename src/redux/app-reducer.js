//Редьюсер APP
import { getAuthUserData } from "./auth-reducer";

const INIT_SUCCESS = "INIT-SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};

export const initSuccess = () => ({type: INIT_SUCCESS});

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData()); //задиспатчил и забыл (с)
  //let promise2 = dispatch(somethingElse());
  //let promise3 = dispatch(somethingElse());
  Promise.all([promise])
    .then(() => {
      dispatch(initSuccess());
    });
}

export default appReducer;
