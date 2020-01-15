import { Dispatch } from 'redux';
import { User, UserAction, UserWithToken } from './../../interfaces/User';
import {
  login as log_in,
  register as registerUser
} from '../../services/user.service';
import setToken from '../../utils/setToken';

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
  localStorage.clear();
  return { type: 'LOG_OUT' };
};

export const login = (credentials: UserAction, remember: boolean) => {
  return async (dispatch: Dispatch) => {
    console.log(credentials);
    const user: UserWithToken = await log_in(credentials);
    console.log(user);
    if (remember) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
    setToken(user.token);
    dispatch({
      type: 'LOG_IN',
      data: user.user
    });
  };
};

export const register = (credentials: UserAction) => {
  return async (dispatch: Dispatch) => {
    const user: UserWithToken = await registerUser(credentials);
    window.localStorage.setItem('user', JSON.stringify(user));
    setToken(user.token);
    dispatch({
      type: 'LOG_IN',
      data: user.user
    });
  };
};

export const checkLocalStorage = () => {
  return async (dispatch: Dispatch) => {
    const userInfo: string | null = localStorage.getItem('user');
    if (userInfo) {
      const userInfoJSON: UserWithToken = JSON.parse(userInfo);
      setToken(userInfoJSON.token);
      return {
        type: 'LOG_IN',
        data: userInfoJSON.user
      };
    }
  };
};

export default reducer;
