import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0)
    }
  }
}));

type Props = {
  newQuestion: () => void;
};

export const NewQuestion: React.FC<Props> = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Fab
        style={{ background: '#ff9999', color: 'white' }}
        aria-label="add"
        onClick={() => props.newQuestion()}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};
