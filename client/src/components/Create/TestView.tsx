import React, { useState, useEffect, useCallback } from 'react';
import { NewQuestion } from './NewQuestion';
import { Question } from '../../interfaces/Question';
import {
  addQuestion,
  removeQuestion,
  clearQuestions,
  updateQuestion,
  setQuestionData,
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
import { EditFormInfo } from './EditFormInfo';
import { ContainerWrapper } from '../Layout/ContainerWrapper';

type Props = {
  id: string;
  create: Question[];
  selected: any;
  addQuestion: (question: Question, id: string) => void;
  removeQuestion: (id: string) => void;
  clearQuestions: () => void;
  updateQuestion: (question: Question) => void;
  setNotification: (notification: NotificationInterface) => void;
  setSelectedFromService: (id: string) => void;
  setQuestionData: (questions: Question[]) => void;
};

const TestView: React.FC<Props> = (props) => {
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
    if (props.selected === null) {
      props.setSelectedFromService(props.id);
      setForm(props.selected);
    }

    if (props.selected !== null && form === null) {
      setForm(props.selected);
      setTitle(props.selected.form.title);
      setDescription(props.selected.form.description);

      props.setQuestionData(props.selected.questions);
    }
  }, [initial, props, form, loadForm]);

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

  const updateFormInfo = (newTitle: string, newDescription: string) => {
    // the description can be empty but the title can't
    if (title === '') {
      return;
    }

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
        <ContainerWrapper>
          <EditFormInfo
            updateFormInfo={updateFormInfo}
            title={title}
            description={description}
          />
          <div>
            <Button
              onClick={() => setPreview(true)}
              variant="contained"
              style={{ color: 'white', backgroundColor: '#ff9999' }}
            >
              Preview
            </Button>
          </div>
          {props.create.map((q: Question) => (
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
        </ContainerWrapper>
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
  setSelectedFromService,
  setQuestionData,
})(TestView);
