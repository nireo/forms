import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Notification } from '../../interfaces/Notifications';
import { getNotificationsAction } from '../../store/notifications/index';
import LoadingBar from '@material-ui/core/CircularProgress';

type Props = {
  notifications: Notification[];
  getNotificationsAction: () => void;
};

const NotificationPreview: React.FC<Props> = ({
  notifications,
  getNotificationsAction,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded && notifications.length === 0) {
      getNotificationsAction();
      setLoaded(false);
    }
  }, []);

  console.log(notifications);

  return (
    <Container maxWidth="lg">
      <Typography style={{ marginTop: '2rem' }} variant="h3">
        Notifications
      </Typography>
      {notifications.length === 0 && !loaded && (
        <div>
          <LoadingBar />
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, { getNotificationsAction })(
  NotificationPreview
);
