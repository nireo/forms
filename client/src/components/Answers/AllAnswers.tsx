import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

export const AllAnswers: React.FC = () => {
  const [data] = useState<any>({
    labels: ['1', '2', '3', '4'],
    data: [25, 25, 25, 25],
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)'
    ]
  });

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
