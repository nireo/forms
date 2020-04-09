export interface Form {
  title: string;
  description: string;
  questions: Question[];
  created_at?: string;
  id?: number;

  // id used for getting the form so that the number id doesn't show
  uuid?: string;
}

export interface Question {
  required: boolean;
  question: string;
  answerType: QuestionType;

  // this will be empty if question is written
  answers: string[];

  // temporary uuid for editing and deleting questions properly.
  temp_uuid: string;

  // since it is needed for backend to specify types, all the properties
  // of every question will be added here.
  step: number;
  min: number;
  max: number;
}

// same as above, but has answers as a string
export interface QuestionToServer {
  required: boolean;
  question: string;
  answerType: QuestionType;
  answers: string;
  temp_uuid: string;
  step: number;
  min: number;
  max: number;
}

export enum QuestionType {
  MultipleChoice = 1,
  Written = 2,
  ManyAnswers = 3,
  Paragraph = 4,
  TrueOrFalse = 5,
  Slider = 6,
}

export interface QuestionWithAnswers {
  questionID: string;
  type: number;
  question: string;
  answers?: string[];
  amounts?: number[];
  labels?: string[];
}
