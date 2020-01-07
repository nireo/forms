import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { SelectQuestion } from './SelectQuestion';
import { MultipleChoice } from './MultipleChoice';
import { MultipleAnswer } from './MultipleAnswer';
import { SliderForm } from './SliderForm';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { removeQuestion, addQuestion } from '../../store/create/reducer';
import { Question } from '../../interfaces/Question';
import { FormInput } from './FormInput';
import TextField from '@material-ui/core/TextField';
import { RadioGroup, Radio } from '@material-ui/core';

type Props = {
  removeQuestion: (id: string) => void;
  addQuestion: (question: Question) => void;
  create: Question[];
  removeQuestionPreview: (id: string) => void;
  questionId: string;
};

const AddQuestion: React.FC<Props> = props => {
  const [questionType, setQuestionType] = useState<string>('small-written');
  const [title, setTitle] = useState<string>('Untitled Question');

  // Answer templates
  const [answers, setAnswers] = useState<string[]>([
    'Answer 1.',
    'Answer 2.',
    'Answer 3.'
  ]);
  const [required, setRequired] = useState<boolean>(false);

  const [step, setStep] = useState<number>(1);
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(10);

  const addQuestionToForm = () => {
    const numberType = () => {
      switch (questionType) {
        case 'multiple-choice':
          return 1;
        case 'small-written':
          return 2;
        case 'multiple-answer':
          return 3;
        case 'paragraph-written':
          return 4;
        case 'true-or-false':
          return 5;
        default:
          return 0;
      }
    };

    // const templateQuestion: Question = {
    //  question: title,
    //  required,
    //  answerType: numberType(),
    //  step,
    //  min,
    //  max,
    //  answers,
    //  temp_uuid: Math.floor(Math.random() * 1000)
    //};

    //props.addQuestion(templateQuestion);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          {questionType === 'multiple-choice' && (
            <MultipleChoice label={title} answers={answers} />
          )}
          {questionType === 'multiple-answer' && (
            <MultipleAnswer answers={answers} setAnswers={setAnswers} />
          )}
          {questionType === 'slide-form' && (
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
          {questionType === 'small-written' && (
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
          {questionType === 'paragraph-written' && (
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
          {questionType === 'true-or-false' && (
            <div>
              <FormInput
                fontSize={24}
                placeholder="Question..."
                value={title}
                setValue={setTitle}
              />
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
        </Grid>
        <Grid item xs={2}>
          <div>
            {/*


            <SelectQuestion
            
              questionType={questionType}
              setQuestionType={setQuestionType}
            />
              */}
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
              onClick={() => props.removeQuestionPreview(props.questionId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  create: state.create
});

export default connect(mapStateToProps, { removeQuestion, addQuestion })(
  AddQuestion
);
