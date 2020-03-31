import React, { useEffect, useState, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  getAnswer,
  removeAnswer as serviceRemoveAnswer
} from '../../services/answer.service';
import { Loading } from '../Layout/Loading';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackwardIosIcon from '@material-ui/icons/ArrowBackIos';
import { ViewAnswer } from './ViewAnswer';
import { AllAnswers } from './AllAnswers';

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  table: {
    minWidth: 650
  }
}));

type Props = {
  id: string;
};

export const AnswersMain: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([]);
  const [selected, setSelected] = useState<number>(1);

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

  const returnSensibleDate = (dateString: string) => {
    const date = new Date(dateString);
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  };

  const removeAnswer = async (id: string) => {
    if (window.confirm('Are you sure you want to delete the answer?')) {
      await serviceRemoveAnswer(id);
      setAnswers(answers.filter((item: any) => item.uuid !== id));
    }
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4">Answers</Typography>
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
              marginRight: '0.8rem'
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
        {loaded === false ? (
          <Loading />
        ) : (
          <div>
            {answers.length > 0 && (
              <div>
                {console.log(answers[selected - 1].uuid)}
                <div>
                  {console.log(answers[selected - 1].uuid)}
                  <ViewAnswer id={answers[selected - 1].uuid} />
                </div>
              </div>
            )}
          </div>
        )}
        <AllAnswers answers={answers} id={props.id} />
      </Paper>
    </Container>
  );
};
