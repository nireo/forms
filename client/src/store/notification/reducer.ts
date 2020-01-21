import { Notification } from '../../interfaces/Notification';

const initialState: Notification = {
  message: '',
  actionName: '',
  actionFunction: () => {
    return;
  },
  autoHideTime: 0
};

const reducer = (state: Notification = initialState, action: any) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR':
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (notification: Notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
  };
};

export const clearNotification = () => {
  return { type: 'CLEAR', data: initialState };
};

export default reducer;
