import { Dispatch } from 'redux';
import { User, UserAction } from './../../interfaces/User';
import {
  login as log_in,
  register as registerUser
} from '../../services/user.service';

const reducer = (state: null | User = null, action: any) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
};

export const logout = () => {
  return { type: 'LOG_OUT' };
};

export const login = (credentials: UserAction) => {
  return async (dispatch: Dispatch) => {
    const user = await log_in(credentials);
    dispatch({
      type: 'LOG_IN',
      data: user
    });
  };
};

export const register = (credentials: UserAction) => {
  return async (dispatch: Dispatch) => {
    const user = await registerUser(credentials);
    dispatch({
      type: 'LOG_IN',
      data: user
    });
  };
};

export const checkLocalStorage = () => {
  const userInfo = localStorage.getItem('user');
  if (userInfo) {
    const userInfoJSON = JSON.parse(userInfo);
    return {
      type: 'LOG_IN',
      data: userInfoJSON
    };
  }
};

export default reducer;
