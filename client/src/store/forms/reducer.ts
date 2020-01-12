import { Form } from './../../interfaces/Question';
import { Dispatch } from 'redux';
import {
  createForm as serviceCreateForm,
  deleteForm as serviceDeleteForm
} from '../../services/form.service';

const reducer = (state: Form[] = [], action: any) => {
  switch (action.type) {
    case 'CREATE':
      if (state.length === 0) {
        return [action.data];
      }
      return [...state, action.data];
    case 'DELETE':
      return state.filter(form => form.id !== action.id);
    case 'UPDATE':
      const form: Form = action.data;
      return state.map(f => (f.title === form.title ? form : f));
    default:
      return state;
  }
};

export const createForm = (info: Form) => {
  return async (dispatch: Dispatch) => {
    const form = await serviceCreateForm(info);
    dispatch({
      type: 'CREATE',
      data: form
    });
  };
};

export const deleteForm = (id: string) => {
  return async (dispatch: Dispatch) => {
    serviceDeleteForm(id);
    dispatch({
      type: 'DELETE',
      id: id
    });
  };
};

export default reducer;
