import { setToken as setUserToken } from '../services/user.service';
import { setToken as setFormToken } from '../services/form.service';

const setTokens = (token: string) => {
  setUserToken(token);
  setFormToken(token);
};

export default setTokens;
