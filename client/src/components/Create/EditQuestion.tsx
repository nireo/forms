import React, { useState, useEffect } from 'react';
import { Question } from '../../interfaces/Question';
import Grid from '@material-ui/core/Grid';
import { SelectQuestion } from './SelectQuestion';
import { MultipleChoice } from './MultipleChoice';
import { connect } from 'react-redux';
import {
  addQuestion,
  removeQuestion,
  clearQuestions
} from '../../store/create/reducer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { FormInput } from './FormInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { MultipleAnswer } from './MultipleAnswer';
import { SliderForm } from './SliderForm';
import Button from '@material-ui/core/Button';

type Props = {
  question: Question;
  removeQuestion: (id: string) => void;
  removeQuestionPreview: (id: string) => void;
  updateWithNewInfo: (question: Question) => void;
};

const EditQuestion: React.FC<Props> = props => {
  const [step, setStep] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [answerType, setAnswerType] = useState<number>(0);
  const [required, setRequired] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  // alias
  const question = props.question;

  useEffect(() => {
    if (loaded === false && props.question) {
      setStep(question.step);
      setMin(question.min);
      setMax(question.max);
      setRequired(question.required);
      setTitle(question.question);
      setAnswerType(question.answerType);
      setAnswers(question.answers);
      setLoaded(true);
    }
  }, []);

  const updateQuestion = () => {
    const questionObject: Question = {
      step,
      min,
      max,
      required,
      question: title,
      answers: answers,
      answerType: answerType,
      temp_uuid: question.temp_uuid
    };

    props.updateWithNewInfo(questionObject);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Grid container spacing={1}>
        <Grid item xs={10}></Grid>
        {answerType === 1 && <MultipleChoice label={title} answers={answers} />}
        {answerType === 2 && (
          <div>
            <FormInput value={title} setValue={setTitle} />
            <TextField
              id="standard-required"
              label="Preview"
              defaultValue="This is the preview"
              disabled
              style={{ width: '100%' }}
            />
          </div>
        )}
        {answerType === 3 && (
          <MultipleAnswer answers={answers} setAnswers={setAnswers} />
        )}
        {answerType === 4 && (
          <div>
            <FormInput value={title} setValue={setTitle} />
            <TextField
              id="standard-multiline-static"
              label="Preview"
              multiline
              rows={4}
              disabled
              defaultValue="This is the preview"
              style={{ width: '100%' }}
            />
          </div>
        )}
        {answerType === 5 && (
          <div>
            <FormInput value={title} setValue={setTitle} />
            <RadioGroup
              aria-label="true-or-false-preview"
              name="Preview"
              value={true}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="True"
                disabled
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="False"
                disabled
              />
            </RadioGroup>
          </div>
        )}
        {answerType === 6 && (
          <SliderForm
            min={min}
            max={max}
            step={step}
            title={title}
            setMin={setMin}
            setMax={setMax}
            setStep={setStep}
            setTitle={setTitle}
          />
        )}
        <Grid item xs={2}>
          n
          <div>
            <SelectQuestion
              questionType={answerType}
              setQuestionType={setAnswerType}
            />
          </div>
          <div>
            <FormControlLabel
              label="Required"
              control={
                <Switch
                  checked={required}
                  onChange={() => setRequired(!required)}
                  color="primary"
                />
              }
            />
          </div>
          <div>
            <IconButton
              aria-label="delete"
              onClick={() => props.removeQuestionPreview(question.temp_uuid)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={updateQuestion}
            >
              Save
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(null, { addQuestion, removeQuestion, clearQuestions })(
  EditQuestion
);
