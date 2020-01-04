import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  return (
    <Container>
      <Typography style={{ marginTop: '4rem' }} variant="h3">
        Benevol Forms
      </Typography>
      <Typography variant="subtitle1">
        Take your forms to the next level
      </Typography>
      <Link to="/">
        <Button color="primary">Get started</Button>
      </Link>
    </Container>
  );
};
