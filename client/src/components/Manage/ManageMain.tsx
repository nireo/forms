import React, { useState, ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Form } from '../../interfaces/Question';
import CardContent from '@material-ui/core/CardContent';
import { NewQuestion } from '../Create/NewQuestion';
import {
  createForm,
  getUserForms,
  deleteForm,
} from '../../store/forms/reducer';
import { Modal } from '../Layout/Modal';
import { TextField, Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { User } from '../../interfaces/User';
import { UserMain } from '../User/UserMain';
import { Link } from 'react-router-dom';
import { logout } from '../../store/user/reducer';
import { GoBack } from '../Layout/GoBack';
import formatDate from '../../utils/FormatDate';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Settings from '../User/Settings';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    minWidth: 240,
  },
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    '& label.Mui-focused': {
      color: '#ff9999',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ff9999',
    },
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
}));

type Props = {
  forms?: Form[];
  createForm: (info: Form) => void;
  user: User | null;
  getUserForms: () => void;
  deleteForm: (id: string) => void;
  logout: () => void;
};

const ManageMain: React.FC<Props> = ({
  forms,
  createForm,
  user,
  getUserForms,
  deleteForm,
  logout,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Untitled form');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const [page, setPage] = useState<string>('Forms');
  const [pages] = useState<string[]>(['Forms', 'Settings']);
  const classes = useStyles();

  useEffect(() => {
    if (loaded === false && user !== null) {
      getUserForms();
      setLoaded(true);
    }
  }, [getUserForms, loaded, user]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (user === null) {
    return <UserMain />;
  }

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
      questions: [],
    };

    createForm(newForm);
    setOpen(false);
  };

  const removeForm = (id: string): void => {
    if (window.confirm('Are you sure you want to delete the form?')) {
      deleteForm(id);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '1rem' }}>
      <Drawer
        open={openDrawer}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {pages.map((p) => (
            <ListItem button onClick={() => setPage(p)} key={p}>
              <ListItemText primary={p} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {page === 'Forms' && (
        <section>
          <Typography variant="h3" style={{ marginTop: '2rem' }}>
            Your forms
          </Typography>
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {forms.map((form) => (
              <Card
                key={form.id}
                className={classes.card}
                style={{ marginBottom: '0.5rem' }}
              >
                <CardContent>
                  <Grid container>
                    <Grid item xs={11}>
                      <Typography variant="h6" gutterBottom>
                        {form.title}
                      </Typography>
                      {form.description.length === 0 ? (
                        <div>
                          <Typography>No Description.</Typography>
                        </div>
                      ) : (
                        <div>
                          <Typography>
                            {form.description.slice(0, 50)}
                          </Typography>
                        </div>
                      )}
                      {form.created_at !== undefined && (
                        <Typography>
                          Created {formatDate(form.created_at)}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={1}>
                      <Link
                        to={`/${
                          form.uuid === undefined ? '' : `${form.uuid}`
                        }/edit`}
                      >
                        <IconButton
                          style={{ color: '#ff9999' }}
                          aria-label="edit-form"
                          component="span"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          style={{ color: '#ff9999' }}
                          component="span"
                          onClick={() =>
                            removeForm(form.uuid === undefined ? '' : form.uuid)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '2px',
              marginBottom: '4rem',
            }}
          >
            <NewQuestion newQuestion={handleOpen} />
          </div>
        </section>
      )}
      {page === 'Settings' && (
        <div>
          <Settings />
        </div>
      )}
      <Modal show={open} handleClose={handleClose}>
        <Container maxWidth="md">
          <form onSubmit={createNewForm}>
            <TextField
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              label="Title"
              className={classes.root}
              style={{
                width: '100%',
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Fab
                style={{ backgroundColor: '#ff9999', color: 'white' }}
                aria-label="add"
                type="submit"
              >
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
  forms: state.forms,
  user: state.user,
});

export default connect(mapStateToProps, {
  createForm,
  getUserForms,
  deleteForm,
  logout,
})(ManageMain);
