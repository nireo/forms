import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getAnswer } from '../../services/answer.service';
import { Answer } from '../../interfaces/Answer';
import { Loading } from '../Layout/Loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  table: {
    minWidth: 650
  }
}));

type Props = {
  id: string;
};

export const AnswersMain: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    if (!loaded) {
      getAnswers();
      setLoaded(true);
    }
  }, []);

  const getAnswers = async () => {
    const data: any = await getAnswer(props.id);
    setAnswers(data);
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4">Answers</Typography>
        {loaded === false ? (
          <Loading />
        ) : (
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="answer table">
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {answers.map((answer: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell>{answer.id}</TableCell>
                      <TableCell>
                        <Link to={`/answer/${answer.uuid}`}>View Answer</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Paper>
    </Container>
  );
};
