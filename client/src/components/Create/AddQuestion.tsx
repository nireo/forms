import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { SelectQuestion } from './SelectQuestion';

export const AddQuestion: React.FC = () => {
  const [questionType, setQuestionType] = useState<string>('');

  return (
    <div style={{ marginTop: '2rem' }}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <p>hello</p>
        </Grid>
        <Grid item xs={3}>
          <SelectQuestion
            questionType={questionType}
            setQuestionType={setQuestionType}
          />
        </Grid>
      </Grid>
    </div>
  );
};
