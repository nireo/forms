import { Question } from './../../components/Form/Question';
import { Form } from './../../interfaces/Question';
import { Dispatch } from 'redux';
import {
  createForm as serviceCreateForm,
  deleteForm as serviceDeleteForm,
  getUserForms as serviceGetUserForms,
  getForm
} from '../../services/form.service';

const reducer = (state: Form[] = [], action: any) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
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

export const getUserForms = () => {
  return async (dispatch: Dispatch) => {
    const forms: Form[] = await serviceGetUserForms();
    dispatch({
      type: 'INIT',
      data: forms
    });
  };
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
