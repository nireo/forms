import { NewAnswer as Answer } from '../interfaces/Answer';
import { Question, QuestionWithAnswers } from '../interfaces/Question';
import { Data as DataInterface } from '../interfaces/Data';

const formatData = (data: DataInterface): QuestionWithAnswers[] => {
  let questionsWithAnswers: QuestionWithAnswers[] = [];
  data?.questions.forEach((question: Question) => {
    if (question.answerType === 1) {
      const newQuestionWithAnswers: QuestionWithAnswers = {
        questionID: question.temp_uuid,
        type: question.answerType,
        question: question.question,
        amounts: [],
        labels: [],
      };

      data?.answers.forEach((answer: Answer) => {
        let index = newQuestionWithAnswers.labels?.indexOf(answer.answers);
        if (
          index !== -1 &&
          index !== undefined &&
          newQuestionWithAnswers.amounts !== undefined &&
          newQuestionWithAnswers.questionID === answer.question_uuid
        ) {
          newQuestionWithAnswers.amounts[index] += 1;
        } else if (
          index !== undefined &&
          newQuestionWithAnswers.questionID === answer.question_uuid
        ) {
          newQuestionWithAnswers.labels = newQuestionWithAnswers.labels?.concat(
            answer.answers
          );
          newQuestionWithAnswers.amounts = newQuestionWithAnswers.amounts?.concat(
            1
          );
        }
      });

      questionsWithAnswers = questionsWithAnswers.concat(
        newQuestionWithAnswers
      );
    } else if (question.answerType === 2) {
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
    } else if (question.answerType === 3) {
      const newQuestionWithAnswers: QuestionWithAnswers = {
        questionID: question.temp_uuid,
        type: question.answerType,
        question: question.question,
        amounts: [],
        labels: [],
      };

      data.answers.forEach((answer: Answer) => {
        if (
          answer.answers.includes('|') &&
          newQuestionWithAnswers.amounts !== undefined
        ) {
          answer.answers.split('|').forEach((a: string) => {
            let index = newQuestionWithAnswers.labels?.indexOf(a);
            if (
              index !== -1 &&
              newQuestionWithAnswers.amounts !== undefined &&
              index !== undefined
            ) {
              newQuestionWithAnswers.amounts[index] += 1;
            } else {
              newQuestionWithAnswers.labels = newQuestionWithAnswers.labels?.concat(
                a
              );
              newQuestionWithAnswers.amounts = newQuestionWithAnswers.amounts?.concat(
                1
              );
            }
          });
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
