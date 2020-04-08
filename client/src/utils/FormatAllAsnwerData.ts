import {
  QuestionWithAnswers,
  Data as DataInterface,
  Answer,
} from '../components/Answers/AllAnswers';
import { Question } from '../interfaces/Question';

const formatData = (data: DataInterface): QuestionWithAnswers[] => {
  let questionsWithAnswers: QuestionWithAnswers[] = [];
  data?.questions.forEach((question: Question) => {
    if (question.answerType === 2) {
      let newQuestionWithAnswers: QuestionWithAnswers = {
        questionID: question.temp_uuid,
        type: question.answerType,
        question: question.question,
        answers: [],
      };

      data?.answers.forEach((answer: Answer) => {
        if (
          answer.type === 2 &&
          answer.question_uuid === question.temp_uuid &&
          newQuestionWithAnswers.answers !== undefined
        ) {
          newQuestionWithAnswers.answers = newQuestionWithAnswers.answers.concat(
            answer.answers
          );
        }
      });

      questionsWithAnswers = questionsWithAnswers.concat(
        newQuestionWithAnswers
      );
    } else if (question.answerType === 5) {
      // 0 index is false and 1 index is true
      const newQuestionWithAnswers: QuestionWithAnswers = {
        questionID: question.temp_uuid,
        type: question.answerType,
        question: question.question,
        amounts: [0, 0],
      };

      data?.answers.forEach((answer: Answer) => {
        if (
          (answer.type === 5 && answer.question_uuid === question.temp_uuid,
          newQuestionWithAnswers.amounts !== undefined)
        ) {
          if (!answer.trueOrFalse) {
            newQuestionWithAnswers.amounts[0] += 1;
          } else {
            newQuestionWithAnswers.amounts[1] += 1;
          }
        }
      });

      questionsWithAnswers = questionsWithAnswers.concat(
        newQuestionWithAnswers
      );
    }
  });

  return questionsWithAnswers;
};

export default formatData;
