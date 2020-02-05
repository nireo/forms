import React, { useState, ChangeEvent, useEffect } from 'react';
import { Question, QuestionType, Form } from '../../interfaces/Question';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Ending } from './Ending';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { getForm } from '../../services/form.service';
import { Loading } from '../Layout/Loading';

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
  questionAnswers: string[];
  trueOrFalse: boolean;
}

type Props = {
  previewData?: Question[];
  hidePreview?: () => void;
  id?: string;
  preview?: boolean;
};

export const AnswerMain: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [finished, setFinished] = useState<boolean>(false);

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
      question: 'This is a paragraph question',
      answers: [],
      answerType: 4,
      temp_uuid: '8c495d25-bce4-4e4c-8e74-e28769af1302'
    },
    {
      step: 1,
      min: 0,
      max: 0,
      required: true,
      question: 'This is a multiple answer question',
      answers: ['Answer 1', 'Answer 2', 'Answer 3'],
      answerType: 3,
      temp_uuid: '8c495d25-bce4-4e4c-8e74-e28769'
    },
    {
      step: 1,
      min: 0,
      max: 0,
      required: true,
      question: 'This is a true or false question',
      answers: [],
      answerType: 5,
      temp_uuid: '8c495d25-bce4-4e4c-8e74'
    }
  ]);
  const [data, setData] = useState<Question[] | null>(null);
  const [answerItems, setAnswerItem] = useState<AnswerItem[]>([]);
  const [formName, setFormName] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');

  useEffect(() => {
    if (mockData.length !== answerItems.length && props.id === undefined) {
      if (props.previewData === undefined) {
        setAnswerItem(
          mockData.map((q: Question) => {
            const answer: AnswerItem = {
              answer: [],
              required: q.required,
              type: q.answerType,
              question: q.question,
              temp_uuid: q.temp_uuid,
              questionAnswers: q.answers,
              trueOrFalse: false
            };
            return answer;
          })
        );
      } else {
        setAnswerItem(
          props.previewData.map((q: Question) => {
            const answer: AnswerItem = {
              answer: [],
              required: q.required,
              type: q.answerType,
              question: q.question,
              temp_uuid: q.temp_uuid,
              questionAnswers: q.answers,
              trueOrFalse: false
            };
            return answer;
          })
        );
      }
    }

    if (data === null && props.id !== undefined) {
      loadData();
    }
  }, []);

  const loadData = async (): Promise<void> => {
    if (props.id === undefined) {
      return;
    }
    const loadData: any = await getForm(props.id);

    setFormName(loadData.form.title);
    setFormDescription(loadData.form.description);

    setAnswerItem(
      loadData.questions.map((q: any) => {
        const answerArray: string[] = q.answers.split('|');
        const answer: AnswerItem = {
          answer: [],
          required: q.required,
          type: q.answerType,
          question: q.question,
          temp_uuid: q.temp_uuid,
          questionAnswers: answerArray,
          trueOrFalse: false
        };

        return answer;
      })
    );

    // set data just incase
    setData(loadData);
  };

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
    setFinished(true);
  };

  const changeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void => {
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

  const checkKey = (question: string, index: number): void => {
    const answer = answerItems[index];
    if (!answer) {
      return;
    }

    if (answer.answer.includes(question)) {
      // remove item
      answer.answer = answer.answer.filter((a: string) => a !== question);
      setAnswerItem(
        answerItems.map(a => (a.temp_uuid === answer.temp_uuid ? answer : a))
      );
      return;
    }
    // add item
    answer.answer = answer.answer.concat(question);
    setAnswerItem(
      answerItems.map(a => (a.temp_uuid === answer.temp_uuid ? answer : a))
    );
    return;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = (event.target as HTMLInputElement).value;
    const answer = answerItems[index];
    if (value === 'true') {
      answer.trueOrFalse = true;
    } else {
      answer.trueOrFalse = false;
    }
    setAnswerItem(
      answerItems.map(a => (a.temp_uuid === answer.temp_uuid ? answer : a))
    );
  };

  const handleRadioChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const answer = answerItems[index];
    answer.answer[0] = (event.target as HTMLInputElement).value;
    setAnswerItem(
      answerItems.map(a => (a.temp_uuid === answer.temp_uuid ? answer : a))
    );
  };

  return (
    <Container maxWidth="md">
      {finished ? (
        <Ending />
      ) : (
        <div>
          <Paper className={classes.paper} style={{ marginBottom: '0' }}>
            {data === null && props.preview === undefined ? (
              <Loading />
            ) : (
              <div>
                <Typography variant="h4">The form name</Typography>
                <Typography>The form description</Typography>
                {props.hidePreview !== undefined && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (props.hidePreview !== undefined) {
                        props.hidePreview();
                      }
                    }}
                  >
                    Hide preview
                  </Button>
                )}
                <hr style={{ marginBottom: '1rem' }} />
                <form onSubmit={submitQuestion}>
                  {answerItems.map((answer: AnswerItem, index: number) => (
                    <div key={answer.temp_uuid} style={{ marginTop: '3rem' }}>
                      {answer.type === 1 && (
                        <div>
                          <Typography variant="h5">
                            {answer.question}
                          </Typography>
                          <RadioGroup
                            aria-label={answer.question}
                            name={answer.question}
                            onChange={event => handleRadioChange(event, index)}
                          >
                            {answer.questionAnswers.map((question: string) => (
                              <div>
                                <FormControlLabel
                                  control={<Radio value={question} />}
                                  label={question}
                                />
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      )}
                      {answer.type === 2 && (
                        <div>
                          <Typography variant="h5">
                            {answer.question}
                          </Typography>
                          <TextField
                            id={`standard-${
                              answer.required ? 'required' : 'basic'
                            }`}
                            value={answer.answer[0]}
                            onChange={event => changeValue(event, index)}
                            style={{ width: '100%', marginTop: '1rem' }}
                            required={answer.required}
                            label="Answer"
                          />
                        </div>
                      )}
                      {answer.type === 3 && (
                        <div>
                          <Typography variant="h5">
                            {answer.question}
                          </Typography>
                          {answer.questionAnswers.map((question: string) => (
                            <div>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={question}
                                    onClick={() => checkKey(question, index)}
                                    color="primary"
                                  />
                                }
                                label={question}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {answer.type === 4 && (
                        <div>
                          <Typography variant="h5">
                            {answer.question}
                          </Typography>
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
                      {answer.type === 5 && (
                        <div>
                          <Typography variant="h5">
                            {answer.question}
                          </Typography>
                          <RadioGroup
                            name={answer.question}
                            value={answer.trueOrFalse}
                            onChange={event => handleChange(event, index)}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio />}
                              label="True"
                            />
                            <FormControlLabel
                              value={false}
                              control={<Radio />}
                              label="False"
                            />
                          </RadioGroup>
                        </div>
                      )}
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
                      disabled={props.previewData === undefined ? false : true}
                      type="submit"
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>
          <div style={{ textAlign: 'center', color: '#586069' }}>
            <Typography style={{ marginTop: '0', paddingTop: '0' }}>
              Forms does not approve of this content.
            </Typography>
          </div>
        </div>
      )}
    </Container>
  );
};
