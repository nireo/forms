// Made this reducer instead of getting the data with a request,
// since react reloads a component too fast so it makes too many requests

import { Dispatch } from 'redux';
import { getForm } from '../../services/form.service';

const reducer = (state: any = null, action: any) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return action.data;
    case 'CLEAR_SELECTED':
      return null;
    default:
      return state;
  }
};

export const clearSelected = () => {
  return { type: 'CLEAR_SELECTED' };
};

export const setSelected = (selected: any) => {
  return { type: 'SET_SELECTED', data: selected };
};

export const setSelectedFromService = (id: string) => {
  return async (dispatch: Dispatch) => {
    const data = await getForm(id);
    dispatch({
      type: 'SET_SELECTED',
      data: data
    });
  };
};

export default reducer;
