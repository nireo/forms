import React, { useState, useEffect, useCallback } from 'react';
import Select from '@material-ui/core/Select';
import { NewAnswer as Answer } from '../../interfaces/Answer';
import { Data as DataInterface } from '../../interfaces/Data';
import { Question } from '../../interfaces/Question';
import { allAnswers } from '../../services/answer.service';
import { ContainerWrapper } from '../Layout/ContainerWrapper';

type Props = {
  id: string;
};

export const SingleQuestion: React.FC<Props> = ({ id }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DataInterface | null>(null);
  const [selected, setSelected] = useState<Question | null>(null);

  const loadData = useCallback(async () => {
    const loadedData = await allAnswers(id);
    setData(loadedData);
  }, []);

  useEffect(() => {
    if (data === null && loaded === false) {
      loadData().then(() => {
        setLoaded(true);
      });
    }
  }, [data, loaded]);

  return <ContainerWrapper></ContainerWrapper>;
};
