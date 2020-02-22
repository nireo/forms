import { setToken as setUserToken } from "../services/user.service";
import { setToken as setFormToken } from "../services/form.service";
import { setToken as setAnswerToken } from "../services/answer.service";
import { setToken as setQuestionToken } from "../services/answer.service";

const setTokens = (token: string) => {
  setUserToken(token);
  setFormToken(token);
};

export default setTokens;
