import React, { useState, ChangeEvent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type Props = {
  answers: string[];
  label: string;
};

// Same as multiple answer, but only with 1 answers.
export const MultipleChoice: React.FC<Props> = ({ answers, label }) => {
  // Temporarily keeping state here, in the future will move somewhere else
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <RadioGroup
        aria-label={label}
        name={label}
        value={value}
        onChange={handleChange}
        {...answers.map((answer: string) => (
          <FormControlLabel value={answer} control={<Radio />} label={answer} />
        ))}
      />
    </div>
  );
};
