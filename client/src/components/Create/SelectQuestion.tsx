import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

type Props = {
  questionType: number;
  setQuestionType: Dispatch<SetStateAction<number>>;
};

export const SelectQuestion: React.FC<Props> = props => {
  const classes = useStyles(props);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    props.setQuestionType(event.target.value as number);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="question-select-label">Question type</InputLabel>
        <Select
          labelId="question-select-label"
          id="question-select"
          value={props.questionType}
          onChange={handleChange}
        >
          <MenuItem value={1}>Multiple choice</MenuItem>
          <MenuItem value={3}>Multiple answer</MenuItem>
          <MenuItem value={2}>Small written</MenuItem>
          <MenuItem value={4}>Paragraph written</MenuItem>
          <MenuItem value={5}>True or false</MenuItem>
          <MenuItem value={6}>Slider</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
