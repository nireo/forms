import React, { useState, ChangeEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { register } from "../../store/user/reducer";
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
    width: "100%",
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
  showLoginPage: () => void;
  register: (credentials: UserAction) => void;
};

const Register: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [startedPassword, setStartedPassword] = useState<boolean>(false);

  const register = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || password === "") {
      return;
    }

    const credentials: UserAction = { username, password };
    try {
      props.register(credentials);
    } catch {
      console.log("something went wrong with registering");
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
    if (startedPassword === false) {
      setStartedPassword(true);
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
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={register}>
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
            onChange={handlePasswordChange}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            className={classes.root}
            error={
              startedPassword &&
              /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/.test(
                password
              )
            }
            helperText={
              startedPassword &&
              !/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/.test(
                password
              )
                ? "Minimum eight characters, at least one letter, one number and one special character"
                : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ color: "white", backgroundColor: "#ff9999" }}
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => props.showLoginPage()}
                style={{ color: "#ff9999" }}
              >
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default connect(null, { register })(Register);
