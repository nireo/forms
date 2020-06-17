import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Notification } from '../../interfaces/Notifications';
import {
  getNotificationsAction,
  deleteNotificationAction,
} from '../../store/notifications/index';
import LoadingBar from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      minWidth: 240,
    },
  })
);

type Props = {
  notifications: Notification[];
  getNotificationsAction: () => void;
  deleteNotificationAction: (id: string) => void;
};

const NotificationPreview: React.FC<Props> = ({
  notifications,
  getNotificationsAction,
  deleteNotificationAction,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    if (!loaded && notifications.length === 0) {
      getNotificationsAction();
      setLoaded(false);
    }
  }, [loaded, notifications.length, getNotificationsAction]);

  const handleNotificationDeletion = (id: string) => {
    deleteNotificationAction(id);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        style={{ marginTop: '2rem', marginBottom: '2rem' }}
        variant="h3"
      >
        Notifications
      </Typography>
      {notifications.length === 0 && !loaded && (
        <div>
          <LoadingBar />
        </div>
      )}
      {notifications.length === 0 && loaded && (
        <div>
          <Typography variant="body1" color="textSecondary">
            No notifications
          </Typography>
        </div>
      )}
      {notifications.map((notification: Notification) => (
        <Card
          key={notification.uuid}
          className={classes.card}
          style={{ marginBottom: '0.5rem' }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="h6" gutterBottom>
                  {notification.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {notification.content}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  style={{ color: '#ff9999' }}
                  component="span"
                  onClick={() => handleNotificationDeletion(notification.uuid)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, {
  getNotificationsAction,
  deleteNotificationAction,
})(NotificationPreview);
