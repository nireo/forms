import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
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
  updateQuestion,
  initQuestions,
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
import { Notification as NotificationInterface } from '../../interfaces/Notification';
import { AnswerMain } from '../Answer/AnswerMain';
import Notification from '../Layout/Notification';
import DeleteIcon from '@material-ui/icons/Delete';
import { getForm, updateForm } from '../../services/form.service';
import { setSelectedFromService } from '../../store/selectedForm/index';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

type Props = {
  id: string;
  create: Question[];
  selected: any;
  addQuestion: (question: Question, id: string) => void;
  removeQuestion: (id: string) => void;
  clearQuestions: () => void;
  updateQuestion: (question: Question) => void;
  setNotification: (notification: NotificationInterface) => void;
  initQuestions: (id: string) => void;
  setSelectedFromService: (id: string) => void;
};

const TestView: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  const [form, setForm] = useState<any>(null);
  const [title, setTitle] = useState<string>('Untitled Form');
  const [description, setDescription] = useState<string>('');
  const [selected, setSelected] = useState<Question | null>(null);
  const [preview, setPreview] = useState<boolean>(false);

  // used for initially loading all questions
  const [initial, setInitial] = useState<boolean>(false);

  const loadForm = useCallback(async () => {
    const form = await getForm(props.id);
    return form;
  }, [props.id]);

  useEffect(() => {
    //if (initial === false) {
    //   props.initQuestions(props.id);
    //   setInitial(true);
    // }

    // if (form === null) {
    //   loadForm().then((response: any) => {
    //     setForm(response.form);
    //     setTitle(response.form.title);
    //     if (response.form.description === ' ') {
    //       setDescription('');
    //     } else {
    //       setDescription(response.form.description);
    //     }
    //   });
    // }

    if (props.selected === null) {
      props.setSelectedFromService(props.id);
      setForm(props.selected);
    }

    if (props.selected !== null && form === null) {
      setForm(props.selected);
      setTitle(props.selected.form.title);
      setDescription(props.selected.form.description);
    }
  }, [initial, props, form, loadForm]);
  console.log(props.selected);

  const newQuestion = () => {
    const uuid: string = uuidv4();
    const templateQuestion: Question = {
      required: false,
      question: 'untitled question',
      answerType: 2,
      answers: [],
      temp_uuid: uuid,
      step: 1,
      min: 1,
      max: 10,
    };

    props.addQuestion(templateQuestion, props.id);

    // const notification: NotificationInterface = {
    //   message: 'Created question successfully',
    //   actionName: 'Undo',
    //   actionFunction: () => {
    //     props.removeQuestion(templateQuestion.temp_uuid);
    //     return;
    //   },
    //   autoHideTime: 3000
    // };

    // props.setNotification(notification);

    // automatically start editing new question
    setSelected(templateQuestion);
  };

  const removeQuestion = (id: string) => {
    props.removeQuestion(id);
  };

  const hidePreview = () => {
    setPreview(false);
  };

  const findAndSetSelected = (id: string): void => {
    const question: Question | undefined = props.create.find(
      (q) => q.temp_uuid === id
    );

    if (!question) {
      return;
    }
    setSelected(question);
  };

  const updateWithNewInfo = (question: Question): void => {
    props.updateQuestion(question);

    // const notification: NotificationInterface = {
    //   message: 'Saved successfully',
    //   actionName: 'Undo',
    //   actionFunction: () => {
    //     return;
    //   },
    //   autoHideTime: 3000
    // };
    // props.setNotification(notification);
  };

  const updateFormInfo = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (description === '') {
      // for some odd reason gin doesn't accept empty string when validating
      setDescription(' ');
    }
    updateForm({ title, description }, props.id);
  };

  return (
    <div>
      <Notification />
      {props.selected === null && <CircularProgress />}
      {!preview && props.selected !== null && (
        <Container maxWidth="md" style={{ marginTop: '0' }}>
          <Paper className={classes.paper}>
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              style={{
                border: 'none',
                fontSize: '36px',
                fontFamily: 'Roboto',
                width: '100%',
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
            <div>
              <Button
                onClick={() => setPreview(true)}
                variant="contained"
                style={{ color: 'white', backgroundColor: '#ff9999' }}
              >
                Preview
              </Button>
              {form !== null && (
                <form onSubmit={updateFormInfo}>
                  {(form.title !== title ||
                    form.description !== description) && (
                    <Button
                      variant="contained"
                      style={{
                        color: 'white',
                        marginTop: '1rem',
                        backgroundColor: '#ff9999',
                      }}
                      type="submit"
                    >
                      Save
                    </Button>
                  )}
                </form>
              )}
            </div>
            {props.selected.questions.map((q: Question) => (
              <Grid key={q.temp_uuid} container spacing={1}>
                <Grid item xs={1}>
                  {q === selected && (
                    <IconButton
                      aria-label="close"
                      component="span"
                      style={{ marginTop: '2rem', color: '#ff9999' }}
                      onClick={() => setSelected(null)}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  {q !== selected && (
                    <IconButton
                      aria-label="edit"
                      component="span"
                      style={{ marginTop: '2rem', color: '#ff9999' }}
                      onClick={() => findAndSetSelected(q.temp_uuid)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="remove"
                    component="span"
                    style={{ color: '#ff9999' }}
                    onClick={() => removeQuestion(q.temp_uuid)}
                  >
                    <DeleteIcon />
                  </IconButton>
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
      )}
      {preview && (
        <AnswerMain
          preview={true}
          hidePreview={hidePreview}
          previewData={props.create}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  create: state.create,
  selected: state.selected,
});

export default connect(mapStateToProps, {
  addQuestion,
  removeQuestion,
  clearQuestions,
  updateQuestion,
  setNotification,
  initQuestions,
  setSelectedFromService,
})(TestView);
