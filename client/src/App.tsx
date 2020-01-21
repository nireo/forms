import React, { useEffect } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FormMain } from './components/Form/FormMain';
import ManageMain from './components/Manage/ManageMain';
import { Welcome } from './components/Welcome/Welcome';
import TestView from './components/Create/TestView';
import { NotFound } from './components/Layout/NotFound';
import { AnswerMain } from './components/Answer/AnswerMain';
import { connect } from 'react-redux';
import { AppState } from './store';
import { User } from './interfaces/User';
import { checkLocalStorage } from './store/user/reducer';

type Props = {
  user: User;
  checkLocalStorage: () => void;
};

const App: React.FC<Props> = ({ user, checkLocalStorage }) => {
  useEffect(() => {
    if (!user) {
      checkLocalStorage();
    }
  }, [user]);

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route exact path="/view" render={() => <FormMain />} />
        <Route exact path="/" render={() => <ManageMain />} />
        <Route exact path="/welcome" render={() => <Welcome />} />
        <Route
          exact
          path="/:id/edit"
          render={({ match }) => <TestView id={match.params.id} />}
        />
        <Route
          exact
          path="/:id"
          render={({ match }) => <AnswerMain id={match.params.id} />}
        />
        <Route exact path="/answer-test" render={() => <AnswerMain />} />
        <Route render={() => <NotFound />} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user
});

export default connect(mapStateToProps, { checkLocalStorage })(App);
