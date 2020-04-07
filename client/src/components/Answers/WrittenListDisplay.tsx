import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';

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
  const [checked, setChecked] = useState<string[]>([]);
  const classes = useStyles();

  const handleChange = (answer: string) => () => {
    const currentIndex = checked.indexOf(answer);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(answer);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense className={classes.root}>
      {answers.map((answer: string) => (
        <div>
          {answer !== '' && (
            <ListItem key={answer} button>
              <ListItemText id={answer} primary={answer} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  checked={checked.indexOf(answer) !== -1}
                  onChange={handleChange(answer)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </div>
      ))}
      {checked.length > 0 && (
        <button variant="contained">Delete selected</button>
      )}
    </List>
  );
};
