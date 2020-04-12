import React, { useState, useEffect, useCallback } from 'react';
import { allAnswers } from '../../services/answer.service';
import { Question, QuestionWithAnswers } from '../../interfaces/Question';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { WrittenListDisplay } from './WrittenListDisplay';
import formatData from '../../utils/FormatAllAsnwerData';
import { Data as DataInterface } from '../../interfaces/Data';
import { ContainerWrapper } from '../Layout/ContainerWrapper';

type Props = {
  id: string;
};

export interface Answer {
  answers: string;
  max: number;
  min: number;
  question_uuid: string;
  trueOrFalse: boolean;
  type: number;
  value: number;
}

export const AllAnswers: React.FC<Props> = ({ id }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DataInterface | null>(null);
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
    <div>
      {questionsWithAnswers !== null && (
        <div>
          {questionsWithAnswers.map((question: QuestionWithAnswers) => (
            <ContainerWrapper>
              <Typography variant="h5">{question.question}</Typography>
              <Typography></Typography>
              {question.type === 2 && question.answers !== undefined && (
                <WrittenListDisplay answers={question.answers} />
              )}
              {question.type === 5 && question.amounts && <div></div>}
            </ContainerWrapper>
          ))}
        </div>
      )}
    </div>
  );
};
