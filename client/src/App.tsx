import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Layout/Navbar';
import CreateMain from './components/Create/CreateMain';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FormMain } from './components/Form/FormMain';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route exact path="/create" render={() => <CreateMain />} />
        <Route exact path="/view" render={() => <FormMain />} />
      </Switch>
    </Router>
  );
};

export default App;
