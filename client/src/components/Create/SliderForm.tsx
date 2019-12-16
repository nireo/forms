import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

type Props = {
  min: number;
  max: number;
  step: number;
  title: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    height: theme.spacing(3)
  }
}));

export const SliderForm: React.FC<Props> = props => {
  const classes = useStyles(props);

  return (
    <div>
      <div className={classes.margin}>
        <Typography>{props.title}</Typography>
        <Slider
          defaultValue={props.min}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={props.step}
          marks
          min={props.min}
          max={props.max}
        />
      </div>
    </div>
  );
};
