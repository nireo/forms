import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

export const Navbar: React.FC = () => {
  return (
    <div>
      <AppBar position="relative">
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Forms
            </Typography>
          </Toolbar>
        </AppBar>
      </AppBar>
    </div>
  );
};
