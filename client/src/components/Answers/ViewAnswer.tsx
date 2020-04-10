import React, { useEffect, useState, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Loading } from '../Layout/Loading';
import { getAnswerData } from '../../services/answer.service';
import { QuestionType } from '../../interfaces/Question';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { getForm } from '../../services/form.service';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import formatDate from '../../utils/FormatDate';

interface AnswerItem {
  type: QuestionType;
  answers: string[];
  question_uuid: string;
  value: number;
  trueOrFalse: boolean;
  min: number;
  max: number;
  questionString: string;
  questionAnswers: string[];
}

type Props = {
  id: string;
  answer: any;
};

export const ViewAnswer: React.FC<Props> = (props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [filtered, setFiltered] = useState<AnswerItem[]>([]);
  const [filter, setFilter] = useState<boolean>(false);
  const [formID, setFormID] = useState<string>('');
  const [formQuestions, setFormQuestions] = useState<any>([]);
  const [formLoaded, setFormLoaded] = useState<boolean>(false);
  const [otherInfo, setOtherInfo] = useState<any>();

  const getQuestionData = useCallback(async () => {
    const dataFromServer = await getAnswerData(props.id);
    setFormID(dataFromServer.full.form_uuid);
    setData(dataFromServer.answers);
    setOtherInfo(dataFromServer.full);
  }, [props.id]);

  const getQuestions = useCallback(async () => {
    const questionsFormServer = await getForm(formID);
    setFormQuestions(questionsFormServer.questions);
  }, [formID]);

  useEffect(() => {
    if (!loaded) {
      getQuestionData();
      setLoaded(true);
    }

    if (!filter && data.length > 0 && formQuestions.length > 0) {
      setFiltered(
        data.map((item: any, index: number) => {
          let answerArray = item.answers.split('|');
          const answer: AnswerItem = {
            type: item.type,
            answers: answerArray,
            value: item.value,
            trueOrFalse: item.trueOrFalse,
            question_uuid: item.question_uuid,
            max: item.max,
            min: item.min,
            questionString: formQuestions[index].question,
            questionAnswers: formQuestions[index].answers.split('|'),
          };

          return answer;
        })
      );
      setFilter(true);
    }

    if (formQuestions.length === 0 && !formLoaded && formID !== '') {
      getQuestions();
      setFormLoaded(true);
    }
  }, [
    data,
    formQuestions,
    formLoaded,
    filter,
    formID,
    getQuestionData,
    getQuestions,
    loaded,
  ]);

  console.log(data);

  const removeAnswer = async () => {
    if (window.confirm('Are you sure you want delete the form?')) {
      await axios.delete(`/api/answer/${props.id}`);
    }
  };

  return (
    <Container maxWidth="md">
      <div style={{ marginBottom: '1rem' }}>
        <IconButton
          component="span"
          aria-label="delete-answer"
          style={{ color: '#ff9999' }}
          onClick={removeAnswer}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      {otherInfo && (
        <div>
          <Typography>Answered {formatDate(otherInfo.created_at)}</Typography>
          {props.id}
        </div>
      )}
      {!filter ||
        !loaded ||
        (!formLoaded && (
          <div style={{ marginTop: '3rem' }}>
            <Loading />
          </div>
        ))}
      {filter && filtered.length > 0 && (
        <div>
          {filtered.map((item: AnswerItem) => (
            <div key={item.question_uuid} style={{ marginTop: '3rem' }}>
              {item.type === 1 && (
                <div>
                  <Typography variant="h5">{item.questionString}</Typography>
                  <RadioGroup
                    aria-label={item.questionString}
                    name={item.questionString}
                  >
                    {item.questionAnswers.map((question: string) => (
                      <div key={question}>
                        <FormControlLabel
                          control={
                            <Radio
                              style={{ color: '#ff9999' }}
                              checked={question === item.questionAnswers[0]}
                            />
                          }
                          disabled={true}
                          label={question}
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {item.type === 2 && (
                <div>
                  <Typography variant="h5">{item.questionString}</Typography>
                  <TextField
                    id="standard-basic"
                    value={item.answers[0]}
                    style={{ width: '100%', marginTop: '1rem' }}
                    disabled={true}
                  />
                </div>
              )}
              {item.type === 3 && (
                <div>
                  <Typography variant="h5">{item.questionString}</Typography>
                  {item.questionAnswers.map((questionAnswer: string) => (
                    <div>
                      <FormControlLabel
                        disabled
                        control={
                          <Checkbox
                            color="primary"
                            value={questionAnswer}
                            checked={item.answers.includes(questionAnswer)}
                          />
                        }
                        label={questionAnswer}
                      />
                    </div>
                  ))}
                </div>
              )}
              {item.type === 4 && (
                <div>
                  <Typography variant="h5">{item.questionString}</Typography>
                  <TextField
                    multiline
                    value={item.answers[0]}
                    style={{ width: '100%' }}
                    disabled
                  />
                </div>
              )}
              {item.type === 5 && (
                <div>
                  <Typography variant="h5">{item.questionString}</Typography>
                  <RadioGroup
                    name={item.questionString}
                    value={item.trueOrFalse}
                  >
                    <FormControlLabel
                      label="True"
                      control={<Radio />}
                      value={true}
                    />
                    <FormControlLabel
                      label="False"
                      control={<Radio />}
                      value={false}
                    />
                  </RadioGroup>
                </div>
              )}
              {item.type === 6 && (
                <div>
                  <Typography variant="h5">{item.questionString}</Typography>
                  <Slider
                    max={item.max}
                    min={item.min}
                    marks
                    step={1}
                    aria-labelledby="answer-slider"
                    valueLabelDisplay="auto"
                    value={item.value}
                    disabled={true}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};
