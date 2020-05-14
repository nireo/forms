import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export const NotificationPreview: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography style={{ marginTop: '2rem' }} variant="h3">
        Notifications
      </Typography>
    </Container>
  );
};
