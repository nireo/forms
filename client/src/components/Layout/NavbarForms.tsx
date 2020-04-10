import React, { useState, ChangeEvent } from 'react';
import { FormInput } from '../Create/FormInput';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import { login, register } from '../../store/user/reducer';
import { UserAction } from '../../interfaces/User';

const ColoredCheckbox = withStyles({
  root: {
    color: '#ff9999',
    '&$checked': {
      color: '#ff9999',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

type LoginProps = {
  login: (credentials: UserAction, remember: boolean) => void;
};

const NavbarFormsLogin: React.FC<LoginProps> = ({ login }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);

  const handleLogin = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username !== '' || password !== '') {
      return;
    }

    login({ username, password }, remember);
  };

  return (
    <form onSubmit={handleLogin}>
      <FormInput
        value={username}
        setValue={setUsername}
        placeholder="Username"
      />
      <div style={{ marginTop: '1rem' }}>
        <FormInput
          value={password}
          setValue={setPassword}
          placeholder="Password"
          type="password"
        />
      </div>
      <FormControlLabel
        control={
          <ColoredCheckbox
            checked={remember}
            onClick={() => setRemember(!remember)}
          />
        }
        label="Remember me"
        style={{ marginBottom: '0.25rem' }}
      />
      <Button
        style={{ width: '100%', color: 'white', backgroundColor: '#ff9999' }}
        variant="contained"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export const ConnectedFormsLogin = connect(null, { login })(NavbarFormsLogin);

type RegisterProps = {
  register: (credentials: UserAction) => void;
};

const NavbarFormsRegister: React.FC<RegisterProps> = ({ register }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleRegister = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username !== '' || password !== '' || password !== confirmPassword) {
      return;
    }

    register({ username, password });
  };

  return (
    <form onSubmit={handleRegister}>
      <FormInput
        value={username}
        setValue={setUsername}
        placeholder="Username"
      />
      <div style={{ marginTop: '1rem' }}>
        <FormInput
          value={password}
          setValue={setPassword}
          placeholder="Password"
          type="password"
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <FormInput
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder="Confirm Password"
          type="password"
        />
      </div>
      <Button
        style={{ width: '100%', color: 'white', backgroundColor: '#ff9999' }}
        variant="contained"
        type="submit"
      >
        Register
      </Button>
    </form>
  );
};

export const ConnectedFormsRegister = connect(null, { register })(
  NavbarFormsRegister
);
