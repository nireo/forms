import React, { SyntheticEvent, MouseEvent, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Notification as notificationInterface } from '../../interfaces/Notification';
import { clearNotification } from '../../store/notification/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    }
  })
);

type Props = {
  notification: notificationInterface;
  clearNotification: () => void;
};

const Notification: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.clearNotification();
  };

  useEffect(() => {
    if (props.notification.message !== '') {
      setOpen(true);
    }

    if (props.notification.message === '') {
      setOpen(false);
    }
  }, [props.notification.message]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">{props.notification.message}</span>}
      action={[
        <Button
          key="action"
          color="secondary"
          size="small"
          onClick={props.notification.actionFunction}
        >
          {props.notification.actionName}
        </Button>,
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  notification: state.notification
});

export default connect(mapStateToProps, { clearNotification })(Notification);
