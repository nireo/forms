import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

type Props = {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  question: string;
};

export const TrueOrFalse: React.FC<Props> = ({ value, setValue, question }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      setValue(true);
      return;
    }
    setValue(false);
    return;
  };

  return (
    <div>
      <RadioGroup
        aria-label="true-or-false"
        name={question}
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value={true} control={<Radio />} label="True" />
        <FormControlLabel value={false} control={<Radio />} label="False" />
      </RadioGroup>
    </div>
  );
};
