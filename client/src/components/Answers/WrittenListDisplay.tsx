import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

type Props = {
  answers: string[];
};

export const WrittenListDisplay: React.FC<Props> = ({ answers }) => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {answers.map((answer: string) => (
        <div>
          {answer !== '' && (
            <ListItem key={answer} button>
              <ListItemText id={answer} primary={answer} />
              <ListItemSecondaryAction>
                <Checkbox edge="end" checked={true} />
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </div>
      ))}
    </List>
  );
};
