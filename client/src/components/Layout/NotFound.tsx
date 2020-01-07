import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export const NotFound = () => {
  return (
    <Container style={{ marginTop: '3rem' }}>
      <Typography variant="h3">Not found</Typography>
      <Typography>
        The thing you're looking has not been found. If this page should display
        something; check the URL.
      </Typography>
    </Container>
  );
};
