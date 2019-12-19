export interface Form {
  title: string;
  subtitle: string;
  questions: Question[];
  id: string;
}

export interface Question {
  required: boolean;
  title: string;
  question: string;
  answerType: QuestionType;

  // this will be empty if question is written
  answers: string[];
}

export enum QuestionType {
  Multiple = 1,
  Written = 2,
  ManyAnswers = 3,
  Paragraph = 4,
  TrueOrFalse = 5
}
