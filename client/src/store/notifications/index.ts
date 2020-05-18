import { Notification } from '../../interfaces/Notifications';
import { Dispatch } from 'redux';
import {
  getNotifications,
  deleteNotification,
  getSingleNotification,
} from '../../services/notification.service';

const reducer = (state: Notification[] = [], action: any) => {
  switch (action.type) {
    case 'INIT_NOTIFICATIONS':
      return action.data;
    case 'CLEAR_NOTIFICATIONS':
      return null;
    case 'DELETE_NOTIFICATION':
      return state.filter(
        (notification: Notification) => notification.uuid !== action.id
      );
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

export const getSingleNotificationAction = (id: string) => {
  return async (dispatch: Dispatch) => {
    const notifications = await getSingleNotification(id);
    dispatch({
      type: 'SINGLE_NOTIFICATION',
      data: notifications,
    });
  };
};

export default reducer;
