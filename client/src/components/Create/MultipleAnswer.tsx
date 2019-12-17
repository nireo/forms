import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type Props = {
  answers: string[];
};

interface MAQuestion {
  answer: string;
  checked: boolean;
}

export const MultipleAnswer: React.FC<Props> = ({ answers }) => {
  const [answersWithState, setAnswersWithState] = useState<MAQuestion[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

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

  // IDEA ABOUT FUTURE: create own array for answers, so that it takes less space
  // and is much cleaner than storing both checked states, which won't mean anything
  // in the future.

  console.log(answersWithState);

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
    </div>
  );
};
