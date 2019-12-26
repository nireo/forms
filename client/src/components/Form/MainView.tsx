import React, { useState, ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import CreateMain from '../Create/CreateMain';
import { AnswersMain } from '../Answers/AnswersMain';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

type Props = {
  id: number;
};

export const MainView: React.FC<Props> = props => {
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
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Questions" />
            <Tab label="Answers" />
          </Tabs>
        </Paper>
      </Container>
      {page === 0 && <CreateMain />}
      {page === 1 && <AnswersMain />}
    </div>
  );
};
