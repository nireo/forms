import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

type Props = {
  numberData: number[];
  labels: string[];
  label: string;
};

export const BarChart: React.FC<Props> = ({ numberData, label, labels }) => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded && numberData && labels && label) {
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
              '#ff9999',
              '#0779e4',
              '#8ec6c5',
              '#ff6363',
              '#f4e04d',
              '#61d4b3',
            ],
          },
        ],
      });
      setLoaded(true);
    }
  }, []);

  return (
    <div>
      <Bar
        data={data}
        options={{
          legend: {
            position: 'bottom',
          },
        }}
      />
    </div>
  );
};
