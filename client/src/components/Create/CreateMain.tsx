import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormInput } from './FormInput';

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

export const CreateMain: React.FC = props => {
  const classes = useStyles(props);

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <FormInput placeholder="Form title" fontSize={36} />
      </Paper>
    </Container>
  );
};
