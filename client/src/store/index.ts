import { createStore, combineReducers } from 'redux';
import questionReducer from './question/reducer';
import createReducer from './create/reducer';
import formReducer from './forms/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  form: questionReducer,
  create: createReducer,
  forms: formReducer,
  user: userReducer
});
const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
export default store;
