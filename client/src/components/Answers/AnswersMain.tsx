import React, { useEffect, useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  getAnswer,
  removeAnswer as serviceRemoveAnswer,
} from '../../services/answer.service';
import { Loading } from '../Layout/Loading';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackwardIosIcon from '@material-ui/icons/ArrowBackIos';
import { ViewAnswer } from './ViewAnswer';
import { AllAnswers } from './AllAnswers';
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

type Props = {
  id: string;
};

export const AnswersMain: React.FC<Props> = (props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([]);
  const [selected, setSelected] = useState<number>(1);
  const [page, setPage] = useState<string>('all');

  const getAnswers = useCallback(async () => {
    const data: any = await getAnswer(props.id);
    setAnswers(data);
  }, [props.id]);

  useEffect(() => {
    if (!loaded) {
      getAnswers();
      setLoaded(true);
    }
  }, [getAnswers, loaded]);

  const removeAnswer = async (id: string) => {
    if (window.confirm('Are you sure you want to delete the answer?')) {
      await serviceRemoveAnswer(id);
      setAnswers(answers.filter((item: any) => item.uuid !== id));
    }
  };

  return (
    <ContainerWrapper>
      <Typography variant="h4">Answers</Typography>
      <Divider />
      {page === 'single' ? (
        <Button variant="contained" onClick={() => setPage('all')}>
          Show all answers
        </Button>
      ) : (
        <Button variant="contained" onClick={() => setPage('single')}>
          Show single answers
        </Button>
      )}
      {page === 'single' && (
        <div style={{ display: 'flex' }}>
          {selected !== 1 && (
            <IconButton onClick={() => setSelected(selected - 1)}>
              <ArrowBackwardIosIcon />
            </IconButton>
          )}
          <Typography
            style={{
              marginTop: '0.8rem',
              marginLeft: '0.8rem',
              marginRight: '0.8rem',
            }}
          >
            {selected}/{answers.length}
          </Typography>
          {selected !== answers.length && (
            <IconButton onClick={() => setSelected(selected + 1)}>
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </div>
      )}
      {loaded === false ? (
        <Loading />
      ) : (
        <div>
          {page === 'single' ? (
            <div>
              {answers.length > 0 && (
                <div>
                  <div>
                    <ViewAnswer
                      answer={answers[selected - 1]}
                      id={answers[selected - 1].uuid}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <AllAnswers id={props.id} />
          )}
        </div>
      )}
    </ContainerWrapper>
  );
};
