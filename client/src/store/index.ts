import { createStore, combineReducers, applyMiddleware } from 'redux';
import createReducer from './create/reducer';
import formReducer from './forms/reducer';
import userReducer from './user/reducer';
import selectedReducer from './selectedForm';
import notificationReducer from './notification/reducer';
import notificationsReducer from './notifications/index';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  create: createReducer,
  forms: formReducer,
  user: userReducer,
  notification: notificationReducer,
  selected: selectedReducer,
  notifications: notificationsReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;
export default store;
