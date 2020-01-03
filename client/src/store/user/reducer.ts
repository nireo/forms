import { User } from './../../interfaces/User';

const reducer = (state: null | User = null, action: any) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
};

export default reducer;
