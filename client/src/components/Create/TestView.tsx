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
  clearQuestions,
  updateQuestion
} from '../../store/create/reducer';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import uuidv4 from 'uuid/v4';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import EditQuestion from './EditQuestion';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setNotification } from '../../store/notification/reducer';
import { Notification } from '../../interfaces/Notification';

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
  updateQuestion: (question: Question) => void;
  setNotification: (notification: Notification) => void;
};

const TestView: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [title, setTitle] = useState<string>('Untitled Form');
  const [description, setDescription] = useState<string>('');
  const [selected, setSelected] = useState<Question | null>(null);

  const newQuestion = () => {
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

    // automatically start editing new question
    setSelected(templateQuestion);
  };

  const removeQuestion = (id: string) => {
    props.removeQuestion(id);
  };

  const findAndSetSelected = (id: string): void => {
    const question: Question | undefined = props.create.find(
      q => q.temp_uuid === id
    );

    if (!question) {
      return;
    }
    setSelected(question);
  };

  const updateWithNewInfo = (question: Question): void => {
    props.updateQuestion(question);
    setSelected(question);

    const notification: Notification = {
      message: 'Saved successfully',
      actionName: 'Undo',
      actionFunction: () => {
        return;
      },
      autoHideTime: 3000
    };
    props.setNotification(notification);
  };

  console.log(props.create);

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
        {props.create.map((q: Question) => (
          <Grid container spacing={1}>
            <Grid item xs={1}>
              {q === selected && (
                <IconButton
                  color="primary"
                  aria-label="close"
                  component="span"
                  style={{ marginTop: '2rem' }}
                  onClick={() => setSelected(null)}
                >
                  <CloseIcon />
                </IconButton>
              )}
              {q !== selected && (
                <IconButton
                  color="primary"
                  aria-label="edit"
                  component="span"
                  style={{ marginTop: '2rem' }}
                  onClick={() => findAndSetSelected(q.temp_uuid)}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={11}>
              {selected !== null && q === selected && (
                <div>
                  <EditQuestion
                    updateWithNewInfo={updateWithNewInfo}
                    question={selected}
                  />
                </div>
              )}
              {selected !== q && (
                <div style={{ marginTop: '2rem' }}>
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Question"
                    defaultValue={q.question}
                    style={{ width: '100%' }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => removeQuestion(q.temp_uuid)}
                    style={{ marginTop: '1rem' }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        ))}
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
  clearQuestions,
  updateQuestion,
  setNotification
})(TestView);
