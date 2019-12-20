import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { SelectQuestion } from './SelectQuestion';
import { MultipleChoice } from './MultipleChoice';
import { MultipleAnswer } from './MultipleAnswer';
import { SliderForm } from './SliderForm';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const AddQuestion: React.FC = () => {
  const [questionType, setQuestionType] = useState<string>('');
  const [title, setTitle] = useState<string>('Untitled Question');
  const [answers, setAnswers] = useState<string[]>([
    'Answer 1.',
    'Answer 2.',
    'Answer 3.'
  ]);
  const [required, setRequired] = useState<boolean>(false);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          {questionType === 'multiple-choice' && (
            <MultipleChoice label={title} answers={answers} />
          )}
          {questionType === 'multiple-answer' && (
            <MultipleAnswer answers={answers} />
          )}
          {questionType === 'slide-form' && (
            <SliderForm min={1} max={10} step={1} title={title} />
          )}
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
      </Grid>
    </div>
  );
};
