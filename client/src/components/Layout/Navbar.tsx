import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import { User } from '../../interfaces/User';
import Button from '@material-ui/core/Button';
import { logout } from '../../store/user/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
      color: 'black',
      textDecoration: 'none',
    },
  })
);

type Props = {
  user: User | null;
  logout: () => void;
};

const Navbar: React.FC<Props> = ({ user, logout }) => {
  const classes = useStyles();
  const handleLogout = () => {
    logout();
    return <Redirect to="/bye" />;
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          forms
        </Typography>
        <nav>
          {user !== null && (
            <Link to="/settings" className={classes.link}>
              Settings
            </Link>
          )}
          {user !== null && (
            <Link to="/main" className={classes.link}>
              Your forms
            </Link>
          )}
          {user !== null && (
            <Button
              onClick={handleLogout}
              variant="contained"
              style={{ color: 'white', backgroundColor: '#ff9999' }}
            >
              Logout
            </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
