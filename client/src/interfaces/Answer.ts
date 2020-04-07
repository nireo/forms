import { QuestionType } from './Question';
export interface AnswerFull {
  // the form id the answer goes to
  toForm: string;

  answers: Answer[];
}

export interface Answer {
  // the answers will be ordered by default, this is here just incase.
  questionIndex: number;

  // this is an array type even though there are written questions
  // this is because there are multi answers questions.
  // so it is easier just to get the answer from index 0
  answer: string[];
  answerType: QuestionType;
}

export interface NewAnswer {
  answers: string;
  max: number;
  question_uuid: string;
  trueOrFalse: boolean;
  type: number;
  value: number;
}
