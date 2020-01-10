import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

export const Welcome = () => {
  return (
    <Container>
      <Typography style={{ marginTop: '4rem' }} variant="h3">
        Benevol Forms
      </Typography>
      <Typography variant="h6">Take your forms to the next level</Typography>
      <Link to="/">
        <Button color="primary">Get started</Button>
      </Link>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h4">Get new insight!</Typography>
          <Typography>
            Benevol forms help you to get new insight with making meaningful
            surveys. Getting the right information can really help you and your
            business to improve and grow.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">Why Benevol Forms?</Typography>
          <Typography>
            Why would anyone use Benevol Forms when there are so many different
            choices? The clean ui and the easy to create forms are a great
            reason to use the app.
          </Typography>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: '2rem' }} spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h4">Make question your way!</Typography>
          <Typography>
            To help you truly get meaningful information we provide many
            different question types like multiple choice, written, slider, true
            or false questions, which will help you get the data you need!
          </Typography>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Container>
  );
};
