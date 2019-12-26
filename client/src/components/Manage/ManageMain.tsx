import React, { useState, ChangeEvent } from 'react';
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
import { Modal } from '../Layout/Modal';
import { TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    minWidth: 240
  },
  title: {
    fontSize: 18
  },
  paper: {
    position: 'absolute',
    width: 500,
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
  const [title, setTitle] = useState<string>('Untitled form');
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

  const createNewForm = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newForm: Form = {
      title,
      description: 'No description added.',
      questions: []
    };

    createForm(newForm);
    // hide the modal just for a better experience
    setOpen(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3">Your forms</Typography>
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        {forms.map(form => (
          <Card className={classes.card} style={{ marginBottom: '0.5rem' }}>
            <CardActionArea>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <Typography className={classes.title} gutterBottom>
                      {form.title}
                    </Typography>
                    <Typography>{form.description.slice(0, 50)}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      color="primary"
                      aria-label="edit-form"
                      component="span"
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2px' }}>
        <NewQuestion newQuestion={handleOpen} />
      </div>
      <Modal show={open} handleClose={handleClose}>
        <Container maxWidth="md">
          <form onSubmit={createNewForm}>
            <TextField
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              label="Title"
              style={{
                width: '100%'
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Fab color="primary" aria-label="add" type="submit">
                <AddIcon />
              </Fab>
            </div>
          </form>
        </Container>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  forms: state.forms
});

export default connect(mapStateToProps, { createForm })(ManageMain);
