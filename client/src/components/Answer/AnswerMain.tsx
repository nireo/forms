import React, { useState, ChangeEvent } from 'react';
import { Question } from '../../interfaces/Question';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';

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
  }
}));

export const AnswerMain: React.FC = props => {
  const classes = useStyles(props);

  // use mock data to properly test answers
  const [mockData] = useState<Question[]>([
    {
      step: 1,
      min: 0,
      max: 0,
      required: true,
      question: 'this is a small written question',
      answers: [],
      answerType: 2,
      temp_uuid: 'c59cfe6c-bf68-472a-8418-c7ba8dc629c3'
    },
    {
      step: 1,
      min: 0,
      max: 0,
      required: true,
      question: 'This is a true or false question',
      answers: [],
      answerType: 2,
      temp_uuid: '2fa85dd9-b775-4394-8fed-2d1c5853942c'
    },
    {
      step: 1,
      min: 0,
      max: 0,
      required: true,
      question: 'This is a paragraph question',
      answers: [],
      answerType: 4,
      temp_uuid: '8c495d25-bce4-4e4c-8e74-e28769af1302'
    }
  ]);

  const submitQuestion = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper} style={{ marginBottom: '0' }}>
        <Typography variant="h4">The form name</Typography>
        <Typography>The form description</Typography>
        <hr style={{ marginBottom: '1rem' }} />
        <form onSubmit={submitQuestion}>
          {mockData.map((question: Question) => (
            <div>
              {question.answerType === 1 && <div>multiple choice</div>}
              {question.answerType === 2 && <div>written small</div>}
              {question.answerType === 3 && <div>many answers</div>}
              {question.answerType === 4 && <div>paragraph</div>}
              {question.answerType === 5 && <div>true or false</div>}
              {question.answerType === 6 && <div>slider</div>}
            </div>
          ))}
        </form>
        <Grid container spacing={3}>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              style={{ marginTop: '3rem' }}
              color="primary"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <div style={{ textAlign: 'center', color: '#586069' }}>
        <Typography style={{ marginTop: '0', paddingTop: '0' }}>
          Forms does not approve of this content.
        </Typography>
      </div>
    </Container>
  );
};
