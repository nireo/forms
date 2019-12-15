export interface Form {
  title: string;
  subtitle: string;
  questions: Question[];
  id: string;
}

export interface Question {
  type: string;
  required: boolean;
  title: string;
  question: string;
  answerType: QuestionType;

  // this will be empty if question is written
  answers: string[];
}

enum QuestionType {
  Multiple = 1,
  Written = 2,
  ManyAnswers = 3
}
