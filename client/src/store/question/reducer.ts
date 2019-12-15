import { Form } from './../../interfaces/Question';

const reducer = (state: null | Form = null, action: any) => {
  switch (action.type) {
    case 'SET_FORM':
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

export default reducer;
