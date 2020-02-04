import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

type Props = {
  answers: string[];
  label: string;
  setAnswers: Dispatch<SetStateAction<string[]>>;
};

// Same as multiple answer, but only with 1 answers.
export const MultipleChoice: React.FC<Props> = ({
  answers,
  label,
  setAnswers
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [newAnswer, setNewAnswer] = useState<string>('');
  const addAnswer = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAnswers(answers.concat(newAnswer));
    setNewAnswer('');
    setShowEdit(false);
  };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_: string, i: number) => i !== index));
  };

  return (
    <div>
      <Typography>{answers.length}/10</Typography>
      <RadioGroup aria-label={label} name={label}>
        {answers.map((answer: string, index: number) => (
          <div>
            <FormControlLabel
              disabled
              value={answer}
              control={<Radio />}
              label={answer}
            />
            <Button onClick={() => removeAnswer(index)}>Delete</Button>
          </div>
        ))}
      </RadioGroup>
      {answers.length < 10 && (
        <div>
          {showEdit ? (
            <div>
              <form onSubmit={addAnswer}>
                <TextField
                  value={newAnswer}
                  onChange={({ target }) => setNewAnswer(target.value)}
                  placeholder="New answer"
                />
                <div style={{ marginTop: '0.25rem' }}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ marginRight: '0.25rem' }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setShowEdit(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <IconButton onClick={() => setShowEdit(true)}>
              <Add />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
};
