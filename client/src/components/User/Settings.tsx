import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import { User } from '../../interfaces/User';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { removeUser } from '../../store/user/reducer';
import TextField from '@material-ui/core/TextField';
import { updatePassword as s_updatePassword } from '../../services/user.service';
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';

type Props = {
  user: User;
  removeUser: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& label.Mui-focused': {
        color: '#ff9999',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#ff9999',
      },
    },
  })
);

const Settings: React.FC<Props> = ({ user, removeUser }) => {
  const classes = useStyles();
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
      removeUser();
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
    <Container maxWidth="lg">
      <Typography variant="h3">Settings</Typography>
      <hr />
      <div style={{ marginTop: '2rem' }}>
        <Typography variant="h5">Change password</Typography>
        <form onSubmit={updatePassword}>
          <div style={{ marginBottom: '2rem' }}>
            <TextField
              className={classes.root}
              type="password"
              label="Current password"
              style={{ width: '100%' }}
              value={current}
              onChange={({ target }) => setCurrent(target.value)}
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <TextField
              className={classes.root}
              type="password"
              label="New password"
              style={{ width: '100%' }}
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
            />
          </div>
          <Typography>Next time you can login with the new password</Typography>
          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: '#ff9999', color: 'white' }}
          >
            Change
          </Button>
        </form>
      </div>
      <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      <div style={{ marginTop: '2rem' }}>
        <Typography variant="h5">Delete account</Typography>
        <Typography>
          All data related to you will be deleted as well.
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: '#ff9999', color: 'white' }}
          onClick={removeAccount}
        >
          Delete
        </Button>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { removeUser })(Settings);
