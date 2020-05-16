import { setToken as setUserToken } from '../services/user.service';
import { setToken as setFormToken } from '../services/form.service';
import { setToken as setAnswerToken } from '../services/answer.service';
import { setToken as setQuestionToken } from '../services/question.service';
import { setToken as setNotificationToken } from '../services/notification.service';

const setTokens = (token: string) => {
  setUserToken(token);
  setFormToken(token);
  setAnswerToken(token);
  setQuestionToken(token);
  setNotificationToken(token);
};

export default setTokens;
