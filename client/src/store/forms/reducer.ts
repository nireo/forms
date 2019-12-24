import { Form } from './../../interfaces/Question';

const reducer = (state: Form[] = [], action: any) => {
  switch (action.type) {
    case 'CREATE':
      if (state.length === 0) {
        return action.data;
      }
      return [...state, action.data];
    case 'DELETE':
      return state.filter(form => form.id !== action.id);
    default:
      return state;
  }
};

export const createForm = (info: object) => {
  return { type: 'CREATE', data: info };
};

export const deleteForm = (id: string) => {
  return { type: 'DELETE', id };
};

export default reducer;
