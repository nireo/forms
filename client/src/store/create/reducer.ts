import { Dispatch } from 'redux';
import { Question } from './../../interfaces/Question';
import { getForm } from '../../services/form.service';

const reducer = (state: Question[] = [], action: any) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [...state, action.data];
    case 'REMOVE_QUESTION':
      return state.filter((q: Question) => q.temp_uuid !== action.id);
    case 'CLEAR':
      return [];
    case 'SET_FULL':
      return action.data;
    case 'UPDATE':
      const question: Question = action.data;
      return state.map(q =>
        q.temp_uuid === question.temp_uuid ? question : q
      );
    default:
      return state;
  }
};

const turnAnswersToArray = (answers: string): string[] => {
  return answers.split('|');
};

export const initQuestions = (id: string) => {
  return async (dispatch: Dispatch) => {
    const response: any = await getForm(id);
    response.questions.answers = turnAnswersToArray(response.questions.answers);
    dispatch({
      type: 'SET_FULL',
      data: response.questions
    });
  };
};

export const clearQuestions = () => {
  return { type: 'CLEAR' };
};

export const removeQuestion = (id: string) => {
  return { type: 'REMOVE_QUESTION', id: id };
};

export const addQuestion = (question: Question) => {
  return {
    type: 'ADD_QUESTION',
    data: question
  };
};

export const setQuestionFully = (questions: Question[]) => {
  return {
    type: 'SET_FULL',
    data: questions
  };
};

export const updateQuestion = (question: Question) => {
  return {
    type: 'UPDATE',
    data: question
  };
};

export default reducer;
