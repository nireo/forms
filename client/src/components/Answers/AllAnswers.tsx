import React, { useState, useEffect, useCallback } from 'react';
import { PieChart } from './PieChart';
import { allAnswers } from '../../services/answer.service';
import { Question } from '../../interfaces/Question';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { WrittenListDisplay } from './WrittenListDisplay';

type Props = {
  answers: any;
  id: string;
};

interface ItemPercentage {
  amount: number;
  label: string;
}

interface QuestionWithAnswers {
  questionID: string;
  type: number;
  question: string;
  answers: string[];
}

interface Answer {
  answers: string;
  max: number;
  min: number;
  question_uuid: string;
  trueOrFalse: boolean;
  type: number;
  value: number;
}

interface Data {
  questions: Question[];
  answers: Answer[];
}

export const AllAnswers: React.FC<Props> = ({ answers, id }) => {
  const [percentages, setPercentages] = useState<ItemPercentage[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState<
    QuestionWithAnswers[]
  >([]);

  const loadData = useCallback(async () => {
    const loadedData = await allAnswers(id);
    setData(loadedData);
  }, []);

  const formatData = () => {
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
            answer.question_uuid === question.temp_uuid
          ) {
            newQuestionWithAnswers.answers = newQuestionWithAnswers.answers.concat(
              answer.answers
            );
          }
        });

        let withNewQuestion = questionsWithAnswers.concat(
          newQuestionWithAnswers
        );
        setQuestionsWithAnswers(withNewQuestion);
      }
    });
  };

  useEffect(() => {
    if (loaded === false) {
      loadData();
      setLoaded(true);
    }

    if (data !== null) {
      formatData();
    }
  }, [data]);

  return (
    <Container maxWidth="md">
      {questionsWithAnswers !== null && (
        <div>
          {questionsWithAnswers.map((question: QuestionWithAnswers) => (
            <div>
              <Typography variant="h5">{question.question}</Typography>
              <WrittenListDisplay answers={question.answers} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};
