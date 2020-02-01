import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Button from '@material-ui/core/Button';
import { Question } from '../../interfaces/Question';
import { logout } from '../../store/user/reducer';
import { User } from '../../interfaces/User';

type Props = {
  create: Question[];
  user: User;
  logout: () => void;
};

const Navbar: React.FC<Props> = ({ user, logout }) => {
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
              Benevol forms
            </Typography>
            {user && (
              <Button
                color="inherit"
                style={{ color: 'white' }}
                onClick={() => logout()}
              >
                Log out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  create: state.create,
  user: state.user
});

export default connect(mapStateToProps, { logout })(Navbar);
