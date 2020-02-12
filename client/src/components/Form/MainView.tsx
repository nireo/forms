import React, { useState, ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import { AnswersMain } from '../Answers/AnswersMain';
import Container from '@material-ui/core/Container';
import TestView from '../Create/TestView';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

type Props = {
  id: string;
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
          <div>
            <Link to="/main">
              <IconButton component="span" aria-label="go-back">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            Go back
            <Tabs
              value={page}
              onChange={handleChange}
              indicatorColor="default"
              style={{ color: '#ff9999' }}
              centered
            >
              <Tab style={{ color: '#ff9999' }} label="Questions" />
              <Tab style={{ color: '#ff9999' }} label="Answers" />
            </Tabs>
          </div>
        </Paper>
      </Container>
      {page === 1 && <AnswersMain id={props.id} />}
      {page === 0 && <TestView id={props.id} />}
    </div>
  );
};
