import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
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
  questionType: string;
  setQuestionType: Dispatch<SetStateAction<string>>;
};

export const SelectQuestion: React.FC<Props> = props => {
  const [labelWidth, setLabelWidth] = useState<number>(0);
  const classes = useStyles(props);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    props.setQuestionType(event.target.value as string);
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
          <MenuItem value="multiple-choice">Multiple choice</MenuItem>
          <MenuItem value="multiple-answer">Multiple answer</MenuItem>
          <MenuItem value="small-written">Small written</MenuItem>
          <MenuItem value="paragraph-written">Paragraph written</MenuItem>
          <MenuItem value="slide-form">Slider</MenuItem>
          <MenuItem value="true-of-false">True or false</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
