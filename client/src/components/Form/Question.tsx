import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Question = () => {
  return (
    <div>
      <Typography variant="h5" style={{ fontSize: '20px', color: 'black' }}>
        Question title
      </Typography>
      <Typography>Question information</Typography>
    </div>
  );
};
