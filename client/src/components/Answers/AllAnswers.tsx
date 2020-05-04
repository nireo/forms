import React, { useState, useEffect, useCallback } from 'react';
import { allAnswers } from '../../services/answer.service';
import { QuestionWithAnswers } from '../../interfaces/Question';
import { Typography } from '@material-ui/core';
import { WrittenListDisplay } from './WrittenListDisplay';
import formatData from '../../utils/FormatAllAsnwerData';
import { Data as DataInterface } from '../../interfaces/Data';
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';

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
  }, [id]);

  useEffect(() => {
    if (loaded === false) {
      loadData();
      setLoaded(true);
    }

    if (data !== null) {
      setQuestionsWithAnswers(formatData(data));
    }
  }, [data, loadData, loaded]);

  return (
    <div>
      {questionsWithAnswers !== null && (
        <div>
          {questionsWithAnswers.map((question: QuestionWithAnswers) => (
            <ContainerWrapper key={question.question}>
              <Typography variant="h5">{question.question}</Typography>
              {question.type === 1 &&
                question.amounts !== undefined &&
                question.labels !== undefined && (
                  <div>
                    <PieChart
                      numberData={question.amounts}
                      label={question.question}
                      labels={question.labels}
                    />
                  </div>
                )}
              {question.type === 2 && question.answers !== undefined && (
                <WrittenListDisplay answers={question.answers} />
              )}
              {question.type === 3 &&
                question.amounts !== undefined &&
                question.labels !== undefined && (
                  <BarChart
                    numberData={question.amounts}
                    label={question.question}
                    labels={question.labels}
                  />
                )}
              {question.type === 4 && question.answers !== undefined && (
                <div>
                  <WrittenListDisplay answers={question.answers} />
                </div>
              )}
              {question.type === 5 && question.amounts && (
                <div>
                  <PieChart
                    label={question.question}
                    labels={['False', 'True']}
                    numberData={question.amounts}
                  />
                </div>
              )}
            </ContainerWrapper>
          ))}
        </div>
      )}
    </div>
  );
};
