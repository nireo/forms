import React, { useState, useEffect, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import { getSingleNotification } from '../../services/notification.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Notification } from '../../interfaces/Notifications';
import Button from '@material-ui/core/Button';

type Props = {
  id: string;
};

export const SingleNotification: React.FC<Props> = ({ id }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Notification | null>(null);

  const loadData = useCallback(async () => {
    const notifications = await getSingleNotification(id);
    setLoaded(true);
    setData(notifications);
  }, []);

  useEffect(() => {
    if (!loaded) {
      loadData();
    }
  }, []);
  return (
    <Container maxWidth="md">
      {data === null && !loaded && (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      )}
      {data === null && loaded && (
        <div>
          <Typography variant="h5">Not found</Typography>
          <Typography color="textSecondary">
            The notification with the id: '{id}' has not been found.
          </Typography>
        </div>
      )}
      {data !== null && (
        <div>
          <Typography variant="h5">{data.title}</Typography>
          <Typography color="textSecondary">{data.content}</Typography>
          <Button variant="contained">Delete notification</Button>
        </div>
      )}
    </Container>
  );
};
