import React from 'react';
import Button from '@material-ui/core/Button';

export const SubmitButton = () => {
  return (
    <div>
      <hr />
      <div style={{ textAlign: 'center' }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          style={{
            marginTop: '0.6rem',
            width: '50%',
            height: '64px',
            fontSize: '20px'
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
