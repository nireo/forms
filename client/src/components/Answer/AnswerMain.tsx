import React, { useState, ChangeEvent, useEffect } from 'react';
import { Question, QuestionType } from '../../interfaces/Question';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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

interface AnswerItem {
  type: QuestionType;
  answer: string[];
  required: boolean;
  question: string;
  temp_uuid: string;
}

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
  const [answerItems, setAnswerItem] = useState<AnswerItem[]>([]);

  useEffect(() => {
    if (mockData.length !== answerItems.length) {
      setAnswerItem(
        mockData.map((q: Question) => {
          const answer: AnswerItem = {
            answer: [],
            required: q.required,
            type: q.answerType,
            question: q.question,
            temp_uuid: q.temp_uuid
          };
          return answer;
        })
      );
    }
  }, []);

  const submitQuestion = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validate that every required answer has been answered
    let passes: boolean = false;
    answerItems.forEach((item: AnswerItem) => {
      if (!item.required) {
        return;
      }

      if (item.answer !== []) {
        passes = true;
        return;
      }
    });

    if (!passes) {
      return;
    }

    // send answers
  };

  const changeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    let answer = answerItems[index];
    if (!answer) {
      return;
    }
    if (answer.type === 2 || answer.type === 4) {
      answer.answer[0] = event.target.value;
    }
    setAnswerItem(
      answerItems.map(a => (a.temp_uuid === answer.temp_uuid ? answer : a))
    );
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper} style={{ marginBottom: '0' }}>
        <Typography variant="h4">The form name</Typography>
        <Typography>The form description</Typography>
        <hr style={{ marginBottom: '1rem' }} />
        <form onSubmit={submitQuestion}>
          {answerItems.map((answer: AnswerItem, index: number) => (
            <div key={answer.temp_uuid} style={{ marginTop: '3rem' }}>
              {answer.type === 1 && <div>multiple choice</div>}
              {answer.type === 2 && (
                <div>
                  <Typography variant="h5">{answer.question}</Typography>
                  <TextField
                    id={`standard-${answer.required ? 'required' : 'basic'}`}
                    value={answer.answer[0]}
                    onChange={event => changeValue(event, index)}
                    style={{ width: '100%', marginTop: '1rem' }}
                    required={answer.required}
                    label="Answer"
                  />
                </div>
              )}
              {answer.type === 3 && <div>many answers</div>}
              {answer.type === 4 && (
                <div>
                  <Typography variant="h5">{answer.question}</Typography>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Answer"
                    multiline
                    value={answer.answer[0]}
                    onChange={event => changeValue(event, index)}
                    style={{ width: '100%' }}
                  />
                </div>
              )}
              {answer.type === 5 && <div>true or false</div>}
              {answer.type === 6 && <div>slider</div>}
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
