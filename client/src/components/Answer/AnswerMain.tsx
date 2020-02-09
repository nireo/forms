import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { Question, QuestionType } from '../../interfaces/Question';
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
import { createAnswer } from '../../services/answer.service';
import Slider from '@material-ui/core/Slider';

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
  step: number;
  min: number;
  max: number;
}

type Props = {
  previewData?: Question[];
  hidePreview?: () => void;
  id?: string;
  preview?: boolean;
  demo?: boolean;
};

export const AnswerMain: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [finished, setFinished] = useState<boolean>(false);
  const [data, setData] = useState<Question[] | null>(null);
  const [answerItems, setAnswerItem] = useState<AnswerItem[]>([]);
  const [formName, setFormName] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [demoData] = useState([
    {
      answerType: 2,
      answers: [''],
      max: 10,
      min: 1,
      question: 'This is a small written question',
      required: true,
      step: 1,
      temp_uuid: '02a5715f-2396-45b3-84fc-257c4bd02a08'
    },
    {
      answerType: 3,
      answers: ['Option 1', 'Option 2', 'Option 3'],
      max: 10,
      min: 1,
      question: 'Multiple answer question',
      required: false,
      step: 1,
      temp_uuid: '4fc0942a-21d8-429b-9ce2-d97cc23a7dfe'
    },
    {
      answerType: 5,
      answers: [''],
      max: 10,
      min: 1,
      question: 'True or false question',
      required: false,
      step: 1,
      temp_uuid: '3396d1c3-54e0-4786-8282-e0caf8e002ce'
    },
    {
      answerType: 6,
      answers: [''],
      max: 8,
      min: 1,
      question: 'Slider question',
      required: false,
      step: 1,
      temp_uuid: '4844c6e1-a005-416a-bc22-1206ed076b5d'
    }
  ]);

  const loadData = useCallback(async () => {
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
          trueOrFalse: false,
          step: q.step,
          max: q.max,
          min: q.min
        };

        return answer;
      })
    );

    // set data just incase
    setData(loadData);
  }, [props.id]);

  useEffect(() => {
    if (
      props.id === undefined &&
      props.preview !== undefined &&
      props.previewData !== undefined
    ) {
      setAnswerItem(
        props.previewData.map((q: Question) => {
          const answer: AnswerItem = {
            answer: [],
            required: q.required,
            type: q.answerType,
            question: q.question,
            temp_uuid: q.temp_uuid,
            questionAnswers: q.answers,
            trueOrFalse: false,
            step: q.step,
            min: q.min,
            max: q.max
          };
          return answer;
        })
      );
    }

    if (props.demo !== undefined && props.id === undefined) {
      console.log('demo mode');
      setAnswerItem(
        demoData.map((q: Question) => {
          const answer: AnswerItem = {
            answer: [],
            required: q.required,
            type: q.answerType,
            question: q.question,
            temp_uuid: q.temp_uuid,
            questionAnswers: q.answers,
            trueOrFalse: false,
            step: q.step,
            min: q.min,
            max: q.max
          };
          return answer;
        })
      );
    }

    if (data === null && props.id !== undefined) {
      loadData();
    }
  }, [data, loadData, props.id, props.preview, props.previewData]);

  const submitQuestion = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalAnswers = answerItems.map((a: AnswerItem) => {
      let trueOrFalse: string = '';
      if (a.trueOrFalse) {
        trueOrFalse = 'true';
      } else {
        trueOrFalse = 'false';
      }

      const filtered = {
        answer: a.answer,
        type: a.type,
        temp_uuid: a.temp_uuid,
        slider_value: 0,
        slider_min: 0,
        trueOrFalse: trueOrFalse
      };
      return filtered;
    });

    try {
      if (props.id) {
        await createAnswer({ answers: finalAnswers }, props.id);
        setFinished(true);
      }
      return;
    } catch (error) {
      console.log(error);
    }
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
            {data === null &&
            props.preview === undefined &&
            props.demo === undefined ? (
              <Loading />
            ) : (
              <div>
                {props.demo === undefined ? (
                  <Typography variant="h4">{formName}</Typography>
                ) : (
                  <Typography variant="h4">Demo form</Typography>
                )}
                {props.demo === undefined ? (
                  <Typography>{formDescription}</Typography>
                ) : (
                  <Typography>
                    This form displays a few of the features you can use when
                    making forms.
                  </Typography>
                )}
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
                      {answer.type === 6 && (
                        <div>
                          <Typography variant="h5">
                            {answer.question}
                          </Typography>
                          <Slider
                            defaultValue={answer.min}
                            step={answer.step}
                            marks
                            valueLabelDisplay="auto"
                            min={answer.min}
                            max={answer.max}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <Grid container spacing={3}>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        style={{ marginTop: '3rem' }}
                        color="primary"
                        endIcon={<SendIcon />}
                        disabled={
                          props.previewData === undefined ? false : true
                        }
                        type="submit"
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            )}
          </Paper>
          <div
            style={{
              textAlign: 'center',
              color: '#586069',
              marginBottom: '5rem'
            }}
          >
            <Typography style={{ marginTop: '0', paddingTop: '0' }}>
              Forms does not approve of this content.
            </Typography>
          </div>
        </div>
      )}
    </Container>
  );
};
