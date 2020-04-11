import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const Bye: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ marginTop: '6rem' }}>
        Bye!
      </Typography>
      <Typography>You've successfully logged out.</Typography>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          style={{ color: 'white', backgroundColor: '#ff9999' }}
        >
          Go to homepage
        </Button>
      </Link>
    </Container>
  );
};
