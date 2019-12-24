// taking react-redux for a small project might be overkill,
// but it is the cleanest way to do it, in my opinion.
import { createStore, combineReducers } from 'redux';
import questionReducer from './question/reducer';
import createReducer from './create/reducer';
import formReducer from './forms/reducer';

const rootReducer = combineReducers({
  form: questionReducer,
  create: createReducer,
  forms: formReducer
});
const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
export default store;
