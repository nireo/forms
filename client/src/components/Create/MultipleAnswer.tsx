import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type Props = {
  answers: string[];
  setAnswers: Dispatch<SetStateAction<string[]>>;
};

interface MAQuestion {
  answer: string;
  checked: boolean;
}

export const MultipleAnswer: React.FC<Props> = ({ answers, setAnswers }) => {
  const [answersWithState, setAnswersWithState] = useState<MAQuestion[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [newAnswer, setNewAnswer] = useState<string>('');

  useEffect(() => {
    if (loaded === false) {
      if (answers) {
        // make a new array with checked status
        setAnswersWithState(
          answers.map((answer: string) => {
            return { answer, checked: false };
          })
        );
      }
      setLoaded(true);
    }
  }, [loaded, setLoaded, answersWithState, setAnswersWithState, answers]);

  const addAnswer = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAnswers(answers.concat(newAnswer));
    setAnswersWithState(
      answersWithState.concat({ answer: newAnswer, checked: false })
    );
    setNewAnswer('');
    setShowEdit(false);
  };

  // IDEA ABOUT FUTURE: create own array for answers, so that it takes less space
  // and is much cleaner than storing both checked states, which won't mean anything
  // in the future.

  return (
    <div>
      {answersWithState.map((answer: MAQuestion) => (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value={answer.answer}
                checked={answer.checked}
              />
            }
            label={answer.answer}
          />
        </div>
      ))}
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
              <Button variant="contained" onClick={() => setShowEdit(false)}>
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
  );
};
