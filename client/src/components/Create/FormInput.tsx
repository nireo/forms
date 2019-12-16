import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type Props = {
  fontSize: number;
  placeholder: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export const FormInput: React.FC<Props> = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <TextField
        id="standard-basic"
        style={{ fontSize: `${props.fontSize}px` }}
        placeholder={props.placeholder}
      />
    </div>
  );
};
