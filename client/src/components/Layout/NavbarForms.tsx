import React, { useState } from 'react';
import { FormInput } from '../Create/FormInput';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ColoredCheckbox = withStyles({
  root: {
    color: '#ff9999',
    '&$checked': {
      color: '#ff9999',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export const NavbarFormsLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);

  return (
    <form>
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

export const NavbarFormsRegister: React.FC = () => {
  return <div></div>;
};
