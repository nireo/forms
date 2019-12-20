import React, { useState } from 'react';
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
import { AddQuestion } from './AddQuestion';

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

const CreateMain: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [title, setTitle] = useState<string>('Untitled Form');
  const [description, setDescription] = useState<string>('');

  const addQuestionToForm = () => {
    const templateQuestion: Question = {
      title: 'Untitled question',
      answerType: 2,
      required: false,
      answers: [],
      question: 'More about the question.'
    };

    props.addQuestion(templateQuestion);
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <FormInput
          placeholder="Form title"
          fontSize={36}
          value={title}
          setValue={setTitle}
        />
        <FormInput
          placeholder="Form description"
          fontSize={24}
          value={description}
          setValue={setDescription}
        />
        <AddQuestion />
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <NewQuestion addQuestionToForm={addQuestionToForm} />
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
})(CreateMain);
