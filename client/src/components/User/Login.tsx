import React, { useState, ChangeEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { login } from "../../store/user/reducer";
import { UserAction } from "../../interfaces/User";
import { GoBack } from "../Layout/GoBack";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#ff9999"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    "& label.Mui-focused": {
      color: "#ff9999"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ff9999"
    }
  }
}));

type Props = {
  setShowRegister: () => void;
  login: (credentials: UserAction, remember: boolean) => void;
};

const Login: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const login = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || password === "") {
      return;
    }

    const credentials: UserAction = { username, password };
    try {
      props.login(credentials, remember);
    } catch {
      console.log("something went wrong logging you in.");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <div style={{ marginTop: "2rem", marginBottom: "0" }}>
        <GoBack />
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            className={classes.root}
          />
          <TextField
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            className={classes.root}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={remember}
                onClick={() => setRemember(!remember)}
                style={{ color: "#ff9999" }}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ color: "white", backgroundColor: "#ff9999" }}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => props.setShowRegister()}
                style={{ color: "#ff9999" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default connect(null, { login })(Login);
