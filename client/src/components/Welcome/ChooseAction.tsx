import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
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

export const ChooseAction: React.FC = props => {
  const classes = useStyles(props);
  const [step, setStep] = useState<number>(0);
  const [formID, setFormID] = useState<string>('');

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper} style={{ marginBottom: '0' }}>
        {step === 0 && (
          <div>
            <Typography variant="h2">Welcome!</Typography>
            <Typography>Are you here to:</Typography>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                className="choice-button"
                style={{ marginRight: '2rem' }}
                onClick={() => setStep(1)}
              >
                Answer form
              </button>
              <button className="choice-button">Create form</button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <Typography variant="h2">Answer form</Typography>
            <Typography>Copy paste the id</Typography>
            <div>
              <TextField
                style={{ width: '100%', marginTop: '1rem' }}
                value={formID}
                onChange={({ target }) => setFormID(target.value)}
                label="Form ID"
              />
              <Link to={`/${formID}`} style={{ textDecoration: 'none' }}>
                <Button
                  style={{ marginTop: '1rem' }}
                  variant="contained"
                  color="primary"
                  disabled={formID === ''}
                >
                  Go to form
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Paper>
    </Container>
  );
};
