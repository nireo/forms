import React, { useState, useEffect, useCallback } from 'react';
import { PieChart } from './PieChart';
import { allAnswers } from '../../services/answer.service';

type Props = {
  answers: any;
  id: string;
};

interface ItemPercentage {
  amount: number;
  label: string;
}

export const AllAnswers: React.FC<Props> = ({ answers, id }) => {
  const [percentages, setPercentages] = useState<ItemPercentage[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    const loadedData = await allAnswers(id);
    console.log(loadedData);
    setData(loadedData);
  }, []);

  const formatData = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === 2) {
        let foundPercentage = percentages.find(
          (percentage: ItemPercentage) => percentage.label === data[i].answers
        );
        if (foundPercentage) {
        } else {
          setPercentages(
            percentages.concat({ amount: 1, label: data[i].answers })
          );
        }
      }
    }
  };

  console.log(percentages);

  useEffect(() => {
    if (loaded === false) {
      loadData();
      setLoaded(true);
    }

    if (data.length > 0) {
      formatData();
    }
  }, [data]);

  return <div></div>;
};
