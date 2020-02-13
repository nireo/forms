import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type Props = {
  fontSize?: number;
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& label.Mui-focused': {
      color: '#ff9999'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ff9999'
    }
  },
  formBig: {
    height: 40,
    fontSize: 40
  }
}));

export const FormInput: React.FC<Props> = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <TextField
        placeholder={props.placeholder}
        className={classes.formBig}
        fullWidth
        value={props.value}
        onChange={({ target }) => props.setValue(target.value)}
        style={{ color: '#ff9999' }}
      />
    </div>
  );
};
