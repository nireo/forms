import React, { useState, useEffect } from 'react';
import { PieChart } from './PieChart';

type Props = {
  answers: any;
};

export const AllAnswers: React.FC<Props> = ({ answers }) => {
  const [percentages, setPercentages] = useState<number[]>([]);

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
