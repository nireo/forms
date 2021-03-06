import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  getAnswer,
  // removeAnswer as serviceRemoveAnswer,
} from '../../services/answer.service';
import { Loading } from '../Layout/Loading';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackwardIosIcon from '@material-ui/icons/ArrowBackIos';
import { ViewAnswer } from './ViewAnswer';
import { AllAnswers } from './AllAnswers';
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper, Container, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SingleQuestion } from './SingleQuestion';
import { removeAllAnswers } from '../../services/answer.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(3),
      },
    },
  })
);

type Props = {
  id: string;
};

export const AnswersMain: React.FC<Props> = (props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([]);
  const [selected, setSelected] = useState<number>(1);
  const [tab, setTab] = useState<number>(0);
  const classes = useStyles();

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

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const handleAllAnswerRemove = () => {
    if (window.confirm('Are you sure you want to delete all the answers?')) {
      removeAllAnswers(props.id);
      return;
    }
  };

  console.log(answers);

  return (
    <div>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <Typography variant="h4">{answers.length} answers</Typography>
          <Button
            variant="contained"
            style={{
              color: 'white',
              backgroundColor: '#ff9999',
              marginTop: '1rem',
            }}
            onClick={() => handleAllAnswerRemove()}
          >
            Delete all answers
          </Button>
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Summary" />
            <Tab label="Question" />
            <Tab label="Person" />
          </Tabs>
        </Paper>
      </Container>
      {tab === 2 && (
        <ContainerWrapper>
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
        </ContainerWrapper>
      )}
      {loaded === false ? (
        <Loading />
      ) : (
        <div>
          {tab === 2 && (
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
          )}
          {tab === 1 && <SingleQuestion id={props.id} />}
          {tab === 0 && <AllAnswers id={props.id} />}
        </div>
      )}
    </div>
  );
};
