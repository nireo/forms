import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Navbar } from './components/Layout/Navbar';
import { FormMain } from './components/Form/FormMain';
import { Footer } from './components/Layout/Footer';

const App: React.FC = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <FormMain />
    </div>
  );
};

export default App;
