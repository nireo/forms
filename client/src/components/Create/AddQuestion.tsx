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

type Props = {
  removeQuestion: (id: string) => void;
  addQuestion: (question: Question) => void;
  create: Question[];
};

const AddQuestion: React.FC<Props> = props => {
  const [questionType, setQuestionType] = useState<string>('');
  const [title, setTitle] = useState<string>('Untitled Question');
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
    const templateQuestion: Question = {
      title: 'Untitled question',
      answerType: 2,
      required: false,
      answers: [],
      question: 'More about the question.'
    };

    props.addQuestion(templateQuestion);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          {questionType === 'multiple-choice' && (
            <MultipleChoice label={title} answers={answers} />
          )}
          {questionType === 'multiple-answer' && (
            <MultipleAnswer answers={answers} />
          )}
          {questionType === 'slide-form' && (
            <SliderForm
              min={1}
              max={10}
              step={1}
              title={title}
              setMin={setMin}
              setMax={setMax}
              setStep={setStep}
            />
          )}
        </Grid>
        <Grid item xs={2}>
          <div>
            <SelectQuestion
              questionType={questionType}
              setQuestionType={setQuestionType}
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
            <IconButton aria-label="delete">
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
