import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Loading } from '../Layout/Loading';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { getAnswerData } from '../../services/answer.service';
import { QuestionType } from '../../interfaces/Question';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

interface AnswerItem {
  type: QuestionType;
  answers: string[];
  question_uuid: string;
  value: number;
  trueOrFalse: boolean;
  min: number;
  max: number;
}

type Props = {
  id: string;
};

export const ViewAnswer: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [filtered, setFiltered] = useState<AnswerItem[]>([]);
  const [filter, setFilter] = useState<boolean>(false);

  const getQuestionData = async () => {
    const dataFromServer = await getAnswerData(props.id);
    setData(dataFromServer);
  };

  useEffect(() => {
    if (!loaded) {
      getQuestionData();
      setLoaded(true);
    }

    if (!filter && data.length > 0) {
      setFiltered(
        data.map((item: any) => {
          let answerArray = item.answers.split('|');
          const answer: AnswerItem = {
            type: item.type,
            answers: answerArray,
            value: item.value,
            trueOrFalse: item.trueOrFalse,
            question_uuid: item.question_uuid,
            max: item.max,
            min: item.min
          };

          return answer;
        })
      );
      setFilter(true);
    }
  }, []);

  console.log(data);

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4">Answer {props.id}</Typography>
        {!loaded && (
          <div style={{ marginTop: '3rem' }}>
            <Loading />
          </div>
        )}
      </Paper>
    </Container>
  );
};
