import React, { useState, useEffect, useCallback } from 'react';
import { PieChart } from './PieChart';
import { allAnswers } from '../../services/answer.service';
import { Question } from '../../interfaces/Question';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { WrittenListDisplay } from './WrittenListDisplay';
import formatData from '../../utils/FormatAllAsnwerData';

type Props = {
  answers: any;
  id: string;
};

interface ItemPercentage {
  amount: number;
  label: string;
}

export interface QuestionWithAnswers {
  questionID: string;
  type: number;
  question: string;
  answers?: string[];
  amounts?: number[];
}

export interface Answer {
  answers: string;
  max: number;
  min: number;
  question_uuid: string;
  trueOrFalse: boolean;
  type: number;
  value: number;
}

export interface Data {
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

  useEffect(() => {
    if (loaded === false) {
      loadData();
      setLoaded(true);
    }

    if (data !== null) {
      setQuestionsWithAnswers(formatData(data));
    }
  }, [data]);

  return (
    <Container maxWidth="md">
      {questionsWithAnswers !== null && (
        <div>
          {questionsWithAnswers.map((question: QuestionWithAnswers) => (
            <div>
              <Typography variant="h5">{question.question}</Typography>
              {question.answers !== undefined && (
                <WrittenListDisplay answers={question.answers} />
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};
