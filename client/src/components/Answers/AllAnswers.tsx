import React, { useState, useEffect, useCallback } from 'react';
import { allAnswers } from '../../services/answer.service';
import { QuestionWithAnswers } from '../../interfaces/Question';
import { Typography } from '@material-ui/core';
import { WrittenListDisplay } from './WrittenListDisplay';
import formatData from '../../utils/FormatAllAsnwerData';
import { Data as DataInterface } from '../../interfaces/Data';
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import { PieChart } from './PieChart';
import { Pie, Bar } from 'react-chartjs-2';

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
    console.log(loadedData);
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
            <ContainerWrapper>
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
                  <Bar
                    data={{
                      labels: question.labels,
                      datasets: [
                        {
                          data: question.amounts,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            '#ff9999',
                            '#0779e4',
                            '#8ec6c5',
                            '#ff6363',
                            '#f4e04d',
                            '#61d4b3',
                          ],
                        },
                      ],
                    }}
                  />
                )}
              {question.type === 4 && question.answers !== undefined && (
                <div>
                  <WrittenListDisplay answers={question.answers} />
                </div>
              )}
              {question.type === 5 && question.amounts && (
                <div>
                  <Pie
                    data={{
                      labels: ['False', 'True'],
                      datasets: [
                        {
                          data: question.amounts,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            '#ff9999',
                            '#0779e4',
                            '#8ec6c5',
                            '#ff6363',
                            '#f4e04d',
                            '#61d4b3',
                          ],
                        },
                      ],
                    }}
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
