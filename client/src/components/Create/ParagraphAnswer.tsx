import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  question: string;
  rows: number;
  maxRows: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const ParagraphAnswer: React.FC<Props> = ({
  question,
  rows,
  maxRows,
  value,
  setValue
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <TextField
        label={question}
        rows={rows}
        multiline
        value={value}
        onChange={handleChange}
        rowsMax={maxRows}
        id="standard-multiline-static"
      />
    </div>
  );
};
