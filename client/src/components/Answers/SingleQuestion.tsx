import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import Select from '@material-ui/core/Select';
import { NewAnswer } from '../../interfaces/Answer';
import { Data as DataInterface } from '../../interfaces/Data';
import { Question } from '../../interfaces/Question';
import { allAnswers } from '../../services/answer.service';
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackwardIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

type Props = {
  id: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      '&:before': {
        borderColor: '#ff9999',
      },
      '&:after': {
        borderColor: '#ff9999',
      },
    },
  })
);

export const SingleQuestion: React.FC<Props> = ({ id }) => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DataInterface | null>(null);
  const [selected, setSelected] = useState<string>('');

  const loadData = useCallback(async () => {
    const loadedData = await allAnswers(id);
    setData(loadedData);
  }, [id]);

  useEffect(() => {
    if (data === null && loaded === false) {
      loadData().then(() => {
        setLoaded(true);
      });
    }

    if (data !== null && selected === '' && data.questions.length > 0) {
      setSelected(data.questions[0].temp_uuid);
    }
  }, [data, loaded, loadData, selected]);

  const handleQuestionChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelected(event.target.value as string);
  };

  const gotoNextQuestion = () => {
    const selectedQuestion = data?.questions.find(
      (question: Question) => question.temp_uuid === selected
    );

    if (selectedQuestion === undefined) {
      return;
    }

    const nextQuestion =
      data?.questions[data?.questions.indexOf(selectedQuestion) + 1];

    if (nextQuestion === undefined) {
      return;
    }

    setSelected(nextQuestion.temp_uuid);
    return;
  };

  const gotoPreviousQuestion = () => {
    const selectedQuestion = data?.questions.find(
      (question: Question) => question.temp_uuid === selected
    );

    if (selectedQuestion === undefined) {
      return;
    }

    const previousQuestion =
      data?.questions[data?.questions.indexOf(selectedQuestion) - 1];

    if (previousQuestion === undefined) {
      return;
    }

    setSelected(previousQuestion.temp_uuid);
    return;
  };

  return (
    <div>
      <ContainerWrapper>
        {data === null && <CircularProgress />}
        {data !== null && (
          <div>
            <Typography variant="h6">Select question</Typography>
            <FormControl variant="outlined" style={{ borderColor: '#ff9999' }}>
              <Select
                labelId="demo-simple-select-outlined-label"
                value={selected}
                onChange={handleQuestionChange}
                style={{ width: '400px', borderColor: '#ff9999' }}
                className={classes.select}
              >
                {data.questions.map((question: Question) => (
                  <MenuItem key={question.temp_uuid} value={question.temp_uuid}>
                    {question.question}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </ContainerWrapper>
      <ContainerWrapper>
        <Typography variant="h4">
          {
            data?.questions.find(
              (question: Question) => question.temp_uuid === selected
            )?.question
          }
        </Typography>
      </ContainerWrapper>
      {selected !== '' && data !== null && (
        <div>
          {data.answers
            .filter(
              (answers: NewAnswer) =>
                answers.question_uuid === selected && answers.answers !== ''
            )
            .map((answer: NewAnswer) => (
              <ContainerWrapper key={answer.answers}>
                <Typography style={{ fontSize: '16px' }}>
                  {answer.answers}
                </Typography>
              </ContainerWrapper>
            ))}
        </div>
      )}
      <ContainerWrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <div>
            <Tooltip title="Previous question">
              <IconButton
                disabled={selected === data?.questions[0].temp_uuid}
                onClick={() => gotoPreviousQuestion()}
              >
                <ArrowBackwardIosIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Next question">
              <IconButton
                disabled={
                  selected ===
                  data?.questions[data.questions.length - 1].temp_uuid
                }
                onClick={() => gotoNextQuestion()}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
};
