import { createStore, combineReducers, applyMiddleware } from 'redux';
import createReducer from './create/reducer';
import formReducer from './forms/reducer';
import userReducer from './user/reducer';
import notificationReducer from './notification/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  create: createReducer,
  forms: formReducer,
  user: userReducer,
  notification: notificationReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;
export default store;
