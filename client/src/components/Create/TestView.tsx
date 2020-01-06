import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormInput } from './FormInput';
import { NewQuestion } from './NewQuestion';
import { Question } from '../../interfaces/Question';
import {
  addQuestion,
  removeQuestion,
  clearQuestions
} from '../../store/create/reducer';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import AddQuestion from './AddQuestion';
import uuidv4 from 'uuid/v4';

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
  }
}));

type Props = {
  create: Question[];
  addQuestion: (question: Question) => void;
  removeQuestion: (id: string) => void;
  clearQuestions: () => void;
};

interface FormQuestion {
  component: any;
  id: string;
}

const TestView: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [title, setTitle] = useState<string>('Untitled Form');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<FormQuestion[]>([]);

  const newQuestion = () => {
    // setQuestions(
    //  questions.concat({
    //    component: (
    //      <AddQuestion questionId={id} removeQuestionPreview={removeQuestion} />
    //    ),
    //    id
    //  })
    //);
    const uuid: string = uuidv4();

    const templateQuestion: Question = {
      required: false,
      question: 'untitled question',
      answerType: 2,
      answers: [],
      temp_uuid: uuid,
      step: 1,
      min: 0,
      max: 0
    };

    props.addQuestion(templateQuestion);
  };

  useEffect(() => {
    if (props.create.length !== questions.length) {
      // take the latest question
      const last: Question = props.create[props.create.length - 1];
      const id: string = last.temp_uuid;

      setQuestions(
        questions.concat({
          component: (
            <AddQuestion
              questionId={id}
              removeQuestionPreview={removeQuestion}
            />
          ),
          id
        })
      );
    }

    if (props.create === [] && questions !== []) {
      setQuestions([]);
    }
  }, [props.create, questions, setQuestions]);

  console.log(props.create);

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '0' }}>
      <Paper className={classes.paper}>
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          style={{
            border: 'none',
            fontSize: '36px',
            fontFamily: 'Roboto',
            width: '100%'
          }}
          placeholder="Title..."
          maxLength={50}
        />
        <FormInput
          placeholder="Form description"
          fontSize={24}
          value={description}
          setValue={setDescription}
        />
        {questions.map((q: any) => {
          return q.component;
        })}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <NewQuestion newQuestion={newQuestion} />
        </div>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  create: state.create
});

export default connect(mapStateToProps, {
  addQuestion,
  removeQuestion,
  clearQuestions
})(TestView);
