import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FormMain } from './components/Form/FormMain';
import { MainView } from './components/Form/MainView';
import ManageMain from './components/Manage/ManageMain';
import { Welcome } from './components/Welcome/Welcome';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route
          exact
          path="/:id/edit"
          render={({ match }) => <MainView id={+match.params.id} />}
        />
        <Route exact path="/view" render={() => <FormMain />} />
        <Route exact path="/" render={() => <ManageMain />} />
        <Route exact path="/welcome" render={() => <Welcome />} />
      </Switch>
    </Router>
  );
};

export default App;
