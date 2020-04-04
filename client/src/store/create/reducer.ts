import { Dispatch } from 'redux';
import { Question } from './../../interfaces/Question';
import {
  createQuestion,
  updateQuestion as serviceUpdateQuestion,
  deleteQuestion,
} from '../../services/question.service';

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
    case 'UPDATE_QUESTION':
      const question: Question = action.data;
      return state.map((q) =>
        q.temp_uuid === question.temp_uuid ? question : q
      );
    default:
      return state;
  }
};

const turnAnswersToArray = (answers: string): string[] => {
  return answers.split('|');
};

export const setQuestionData = (questions: Question[]) => {
  return async (dispatch: Dispatch) => {
    // change answers from strings to arrays.
    let filtered = questions.map((question: any) => {
      if (typeof question.answers === 'string') {
        return { ...question, answers: question.answers.split('|') };
      }
    });

    dispatch({
      type: 'SET_FULL',
      data: filtered,
    });
  };
};

export const clearQuestions = () => {
  return { type: 'CLEAR' };
};

export const removeQuestion = (id: string) => {
  return async (dispatch: Dispatch) => {
    await deleteQuestion(id);
    dispatch({
      type: 'REMOVE_QUESTION',
      id: id,
    });
  };
};

export const addQuestion = (question: Question, id: string) => {
  return async (dispatch: Dispatch) => {
    let copy: any = question;
    if (copy.required) {
      copy.required = 'true';
    } else {
      copy.required = 'false';
    }

    const newQuestion: any = await createQuestion(id, copy);
    newQuestion.answers = turnAnswersToArray(newQuestion.answers);

    dispatch({
      type: 'ADD_QUESTION',
      data: newQuestion,
    });
  };
};

export const setQuestionFully = (questions: Question[]) => {
  return {
    type: 'SET_FULL',
    data: questions,
  };
};

export const updateQuestion = (question: Question) => {
  return async (dispatch: Dispatch) => {
    let copy: any = question;
    if (copy.required) {
      copy.required = 'true';
    } else {
      copy.required = 'false';
    }

    const newQuestion: any = await serviceUpdateQuestion(copy.temp_uuid, copy);
    newQuestion.answers = turnAnswersToArray(newQuestion.answers);
    dispatch({
      type: 'UPDATE_QUESTION',
      data: question,
    });
  };
};

export default reducer;
