import { createStore, combineReducers, applyMiddleware } from 'redux';
import questionReducer from './question/reducer';
import createReducer from './create/reducer';
import formReducer from './forms/reducer';
import userReducer from './user/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  form: questionReducer,
  create: createReducer,
  forms: formReducer,
  user: userReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;
export default store;
