import { Notification } from '../../interfaces/Notification';

const reducer = (state: Notification | null = null, action: any) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR':
      return null;
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
  return { type: 'CLEAR' };
};

export default reducer;
