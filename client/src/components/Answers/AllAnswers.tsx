import React, { useState, useEffect, useCallback } from 'react';
import { PieChart } from './PieChart';
import { allAnswers } from '../../services/answer.service';

type Props = {
  answers: any;
  id: string;
};

export const AllAnswers: React.FC<Props> = ({ answers, id }) => {
  const [percentages, setPercentages] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const loadData = useCallback(async () => {
    const loadedData = await allAnswers(id);
    console.log(loadedData);
    setData(loadedData);
  }, []);

  useEffect(() => {
    if (data === [] && !loading) {
      setLoading(true);
      loadData();
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <PieChart
        numberData={[25, 25, 25, 25]}
        labels={['1', '2', '3', '4']}
        label="% of answers"
      />
    </div>
  );
};
