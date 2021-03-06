import React, { useEffect } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManageMain from './components/Manage/ManageMain';
import { Welcome } from './components/Welcome/Welcome';
import { NotFound } from './components/Layout/NotFound';
import { AnswerMain } from './components/Answer/AnswerMain';
import { connect } from 'react-redux';
import { AppState } from './store';
import { User } from './interfaces/User';
import { checkLocalStorage } from './store/user/reducer';
import { MainView } from './components/Form/MainView';
import { ChooseAction } from './components/Welcome/ChooseAction';
import Navbar from './components/Layout/Navbar';
import { Bye } from './components/Layout/Bye';

type Props = {
  user: User;
  checkLocalStorage: () => void;
};

const App: React.FC<Props> = ({ user, checkLocalStorage }) => {
  useEffect(() => {
    if (user === null) {
      checkLocalStorage();
    }
  }, [user, checkLocalStorage]);

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route exact path="/main" render={() => <ManageMain />} />
        <Route exact path="/welcome" render={() => <Welcome />} />
        <Route exact path="/" render={() => <ChooseAction />} />
        <Route exact path="/demo" render={() => <AnswerMain demo={true} />} />
        <Route exact path="/bye" render={() => <Bye />} />
        <Route
          exact
          path="/:id/edit"
          render={({ match }) => <MainView id={match.params.id} />}
        />
        <Route
          exact
          path="/:id"
          render={({ match }) => <AnswerMain id={match.params.id} />}
        />
        <Route render={() => <NotFound />} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { checkLocalStorage })(App);
