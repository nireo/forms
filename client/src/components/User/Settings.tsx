import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import { User } from '../../interfaces/User';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { removeUser } from '../../store/user/reducer';
import TextField from '@material-ui/core/TextField';
import { updatePassword as s_updatePassword } from '../../services/user.service';

type Props = {
  user: User;
  removeUser: () => void;
};

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

const Settings: React.FC<Props> = props => {
  const classes = useStyles(props);
  const { user } = props;
  const [current, setCurrent] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  if (!user) {
    return null;
  }

  const removeAccount = (): void => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? All data will be lost.'
      )
    ) {
      props.removeUser();
    }
  };

  const updatePassword = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (newPassword === '') {
      return;
    }
    s_updatePassword(newPassword);
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4">Settings</Typography>
        <hr />
        <div style={{ marginTop: '2rem' }}>
          <Typography variant="h5">Password</Typography>
          <form onSubmit={updatePassword}>
            <div>
              <TextField
                id="standard-basic"
                label="Current password"
                value={current}
                onChange={({ target }) => setCurrent(target.value)}
              />
              <TextField
                id="standard-basic"
                label="New password"
                value={newPassword}
                onChange={({ target }) => setNewPassword(target.value)}
              />
            </div>
            <Typography>
              Next time you can login with the new password
            </Typography>
            <Button variant="contained" color="primary">
              Change
            </Button>
          </form>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Typography variant="h5">Delete account</Typography>
          <Typography>
            All data related to you will be deleted as well.
          </Typography>
          <Button variant="contained" color="primary" onClick={removeAccount}>
            Delete
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user
});

export default connect(mapStateToProps, { removeUser })(Settings);