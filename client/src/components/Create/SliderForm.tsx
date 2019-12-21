import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

type Props = {
  min: number;
  max: number;
  step: number;
  title: string;
  setStep: Dispatch<SetStateAction<number>>;
  setMin: Dispatch<SetStateAction<number>>;
  setMax: Dispatch<SetStateAction<number>>;
  setTitle: Dispatch<SetStateAction<string>>;
};

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    height: theme.spacing(3)
  },
  margin_2: {
    margin: theme.spacing(1)
  }
}));

export const SliderForm: React.FC<Props> = props => {
  const classes = useStyles(props);

  return (
    <div>
      <div className={classes.margin}>
        <TextField
          placeholder="Question..."
          value={props.title}
          onChange={({ target }) => props.setTitle(target.value)}
          style={{ width: '100%' }}
        />
        <div style={{ marginTop: '1rem' }}>
          Preview of the slider
          <Slider
            defaultValue={props.min}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={props.step}
            marks
            min={props.min}
            max={props.max}
          />
          <div>
            <TextField
              id="standard-basic"
              label="Min"
              value={props.min}
              type="number"
              onChange={({ target }) => props.setMin(+target.value)}
              className={classes.margin_2}
            />
            <TextField
              id="standard-basic"
              label="Step"
              value={props.step}
              type="number"
              onChange={({ target }) => props.setStep(+target.value)}
              className={classes.margin_2}
            />
            <TextField
              id="standard-basic"
              label="Min"
              value={props.min}
              type="number"
              onChange={({ target }) => props.setMin(+target.value)}
              className={classes.margin_2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
