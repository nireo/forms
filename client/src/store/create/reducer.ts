import { Question } from './../../interfaces/Question';

const reducer = (state: Question[] = [], action: any) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [...state, action.data];
    case 'REMOVE_QUESTION':
      return state.filter((q: any) => q.id !== action.id);
    case 'CLEAR':
      return [];
    case 'SET_FULL':
      return action.data;
    default:
      return state;
  }
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

export default reducer;
