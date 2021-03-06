import React, { useState, ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import { AnswersMain } from '../Answers/AnswersMain';
import Container from '@material-ui/core/Container';
import TestView from '../Create/TestView';
import { FormSettings } from './FormSettings';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

type Props = {
  id: string;
};

export const MainView: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  const [page, setPage] = useState<number>(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setPage(newValue);
  };

  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '0' }}>
        <Paper className={classes.root}>
          <Tabs
            value={page}
            onChange={handleChange}
            indicatorColor="secondary"
            centered
          >
            <Tab color="secondary" label="Questions" />
            <Tab color="secondary" label="Answers" />
            <Tab color="secondary" label="Settings" />
          </Tabs>
        </Paper>
      </Container>
      {page === 1 && <AnswersMain id={props.id} />}
      {page === 0 && <TestView id={props.id} />}
      {page === 2 && <FormSettings id={props.id} />}
    </div>
  );
};
