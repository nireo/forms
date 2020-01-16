import { Dispatch } from 'redux';
import { Question, QuestionToServer } from './../../interfaces/Question';
import { getForm } from '../../services/form.service';
import {
  createQuestion,
  updateQuestion as serviceUpdateQuestion,
  deleteQuestion
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

    // answer array is stored as a string so here we parse it
    for (let i = 0; i < response.questions.length; i++) {
      response.questions[i].answers = turnAnswersToArray(
        response.questions[i].answers
      );
    }

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
  return async (dispatch: Dispatch) => {
    await removeQuestion(id);
    dispatch({
      type: 'REMOVE_QUESTION',
      data: id
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
      data: newQuestion
    });
  };
};

export const setQuestionFully = (questions: Question[]) => {
  return {
    type: 'SET_FULL',
    data: questions
  };
};

export const updateQuestion = (question: Question) => {
  return async (dispatch: Dispatch) => {
    let questionToServer: any = question;
    if (questionToServer.answers.length < 1) {
      questionToServer.answers = '';
    } else {
      questionToServer.answers = question.answers.join('|');
    }

    const newQuestion: any = await serviceUpdateQuestion(
      questionToServer.temp_uuid,
      questionToServer
    );
    newQuestion.answers = turnAnswersToArray(newQuestion.answers);

    dispatch({
      type: 'UPDATE_QUESTION',
      data: newQuestion
    });
  };
};

export default reducer;
