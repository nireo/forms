import React, { Dispatch, SetStateAction } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    height: theme.spacing(3)
  }
}));

type Props = {
  rows: number;
  rowsMax: number;
  question: string;
  title: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const Written: React.FC<Props> = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.margin}>
      <Typography variant="h6">{props.title}</Typography>
      <Typography>{props.question}</Typography>
      <TextField
        placeholder="Write your answer here..."
        rows={props.rows}
        rowsMax={props.rowsMax}
        value={props.value}
        onChange={({ target }) => props.setValue(target.value)}
      />
    </div>
  );
};
