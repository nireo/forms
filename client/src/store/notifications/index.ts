import { Notification } from '../../interfaces/Notifications';
import { Dispatch } from 'redux';
import {
  getNotifications,
  deleteNotification,
} from '../../services/notification.service';

const reducer = (state: null | Notification[], action: any) => {
  switch (action.type) {
    case 'INIT_NOTIFICATIONS':
      return action.data;
    case 'CLEAR_NOTIFICATIONS':
      return null;
    default:
      return state;
  }
};

export const getNotificationsAction = () => {
  return async (dispatch: Dispatch) => {
    const notifications = await getNotifications();
    dispatch({
      type: 'INIT_NOTIFICATIONS',
      data: notifications,
    });
  };
};

export const clearNotificationsAction = () => {
  return { type: 'CLEAR_NOTIFICATIONS' };
};

export const deleteNotificationAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    await deleteNotification(id);
    dispatch({
      type: 'DELETE_NOTIFICATION',
      id: id,
    });
  };
};

export default reducer;
