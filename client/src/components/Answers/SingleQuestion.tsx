import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import Select from '@material-ui/core/Select';
import { NewAnswer as Answer } from '../../interfaces/Answer';
import { Data as DataInterface } from '../../interfaces/Data';
import { Question } from '../../interfaces/Question';
import { allAnswers } from '../../services/answer.service';
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  id: string;
};

export const SingleQuestion: React.FC<Props> = ({ id }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DataInterface | null>(null);
  const [selected, setSelected] = useState<string>('');

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

    if (data !== null && selected === '' && data.questions.length > 0) {
      setSelected(data.questions[0].temp_uuid);
    }
  }, [data, loaded]);

  const handleQuestionChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelected(event.target.value as string);
  };

  return (
    <div>
      <ContainerWrapper>
        {data === null && <CircularProgress />}
        {data !== null && (
          <div>
            <Typography variant="h6">Select question</Typography>
            <FormControl variant="outlined">
              <Select
                labelId="demo-simple-select-outlined-label"
                value={selected}
                onChange={handleQuestionChange}
                style={{ width: '400px' }}
              >
                {data.questions.map((question: Question) => (
                  <MenuItem value={question.temp_uuid}>
                    {question.question}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </ContainerWrapper>
      {selected !== '' && <ContainerWrapper>hello</ContainerWrapper>}
    </div>
  );
};
