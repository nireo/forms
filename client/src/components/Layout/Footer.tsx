import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

export const Footer: React.FC = props => {
  const classes = useStyles(props);

  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            Form app built with react and golang
          </Typography>
        </Container>
      </footer>
    </div>
  );
};
