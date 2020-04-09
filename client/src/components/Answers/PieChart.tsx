import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

type Props = {
  numberData: number[];
  labels: string[];
  label: string;
};

export const PieChart: React.FC<Props> = ({ numberData, labels, label }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (!data) {
      setData({
        labels,
        datasets: [
          {
            label: label,
            data: numberData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
          },
        ],
      });
    }
  });

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
