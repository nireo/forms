import React, { useState } from 'react';
import { PieChart } from './PieChart';

export const AllAnswers: React.FC = () => {
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
