import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Form } from '../../interfaces/Question';
import CardContent from '@material-ui/core/CardContent';
import { NewQuestion } from '../Create/NewQuestion';
import { createForm } from '../../store/forms/reducer';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    minWidth: 240
  },
  title: {
    fontSize: 18
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

type Props = {
  forms?: Form[];
  createForm: (info: Form) => void;
};

const ManageMain: React.FC<Props> = ({ forms, createForm }) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (forms === null || forms === undefined) {
    return (
      <Container maxWidth="md">
        <Typography>No forms have been created.</Typography>
      </Container>
    );
  }

  const createNewForm = () => {
    const newForm: Form = {
      title: 'Untitled form',
      description: 'No description added.',
      questions: []
    };

    createForm(newForm);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3">Your forms</Typography>
      {forms.map(form => (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              {form.title}
            </Typography>
            <Typography>{form.description.slice(0, 50)}</Typography>
          </CardContent>
        </Card>
      ))}
      <div style={{ textAlign: 'center', marginTop: '2px' }}>
        <NewQuestion newQuestion={handleOpen} />
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography variant="h6">Create form</Typography>
        </div>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  forms: state.forms
});

export default connect(mapStateToProps, { createForm })(ManageMain);
