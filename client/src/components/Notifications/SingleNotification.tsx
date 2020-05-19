import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import Container from '@material-ui/core/Container';
import { getSingleNotification } from '../../services/notification.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Notification } from '../../interfaces/Notifications';
import Button from '@material-ui/core/Button';
import { deleteNotificationAction } from "../../store/notifications/index";
import { connect }from 'react-redux'
import { Redirect } from 'react-router-dom';

type Props = {
  id: string;
  deleteNotificationAction: (id: string) => void;
};

const SingleNotification: React.FC<Props> = ({ id, deleteNotificationAction }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Notification | null>(null);

  const loadData = useCallback(async () => {
    const notifications = await getSingleNotification(id);
    setLoaded(true);
    setData(notifications);
  }, [id]);

  useEffect(() => {
    if (!loaded) {
      loadData();
    }
  }, [loadData, loaded]);
  
  const handleNotificationDeletion = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteNotificationAction(id);

    return <Redirect to="/home" />
  } 

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
            <form onSubmit={handleNotificationDeletion}>
              <Button type="submit" variant="contained">Delete notification</Button>
            </form>
        </div>
      )}
    </Container>
  );
};

export default connect(null, { deleteNotificationAction })(SingleNotification)
