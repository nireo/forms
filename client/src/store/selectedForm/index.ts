// Made this reducer instead of getting the data with a request,
// since react reloads a component too fast so it makes too many requests

const initialState = {
  loading: false,
  form: {}
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return action.data;
    case 'CLEAR_SELECTED':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
