import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ContainerWrapper } from '../Layout/ContainerWrapper';

type Props = {
  customMessage: string;
};

export const Ending: React.FC<Props> = ({ customMessage }) => {
  return (
    <ContainerWrapper>
      <Typography variant="h4">Thank you for answering!</Typography>
      <Typography>
        Your answer has now been sent to the creator of the survey. You may
        close this page.
      </Typography>

      <Typography>{customMessage}</Typography>
    </ContainerWrapper>
  );
};
