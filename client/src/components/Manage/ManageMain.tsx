import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from '../../interfaces/Question';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  card: {
    minWidth: 240
  },
  title: {
    fontSize: 18
  }
});

type Props = {
  forms?: Form[];
};

const ManageMain: React.FC<Props> = ({ forms }) => {
  const classes = useStyles();

  if (forms === null || forms === undefined) {
    return (
      <Container maxWidth="md">
        <Typography>No forms have been created.</Typography>
      </Container>
    );
  }

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
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  forms: state.forms
});

export default connect(mapStateToProps, null)(ManageMain);
