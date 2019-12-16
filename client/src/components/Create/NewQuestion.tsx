import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0)
    }
  }
}));

export const NewQuestion: React.FC = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
};
