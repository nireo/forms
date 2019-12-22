import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Button from '@material-ui/core/Button';
import { Question } from '../../interfaces/Question';

type Props = {
  create: Question[];
};

const Navbar: React.FC<Props> = () => {
  return (
    <div>
      <AppBar position="relative">
        <AppBar position="relative">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ marginRight: '3rem' }}
            >
              Untitled document
            </Typography>
            <Button color="inherit" style={{ color: 'white' }}>
              Send
            </Button>
          </Toolbar>
        </AppBar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  create: state.create
});

export default connect(mapStateToProps, {})(Navbar);
