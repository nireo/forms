import React, { useState, useEffect } from 'react';
import { Question } from '../../interfaces/Question';
import Grid from '@material-ui/core/Grid';

type Props = {
  question: Question;
  removeQuestion: (id: string) => void;
  removeQuestionPreview: (id: string) => void;
};

export const EditQuestion: React.FC<Props> = props => {
  const [step, setStep] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [answerType, setAnswerType] = useState<number>(0);
  const [required, setRequired] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  // alias
  const question = props.question;

  useEffect(() => {
    if (loaded === false && props.question) {
      setStep(question.step);
      setMin(question.min);
      setMax(question.max);
      setRequired(question.required);
      setTitle(question.question);
      setAnswerType(question.answerType);
      setAnswers(question.answers);
      setLoaded(true);
    }
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Grid container spacing={1}>
        <Grid item xs={10}></Grid>

        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};
