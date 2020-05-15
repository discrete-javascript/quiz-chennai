import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import Copyright from '../base/copyright';
import regex from '../../utils/regex';
import { useDispatch, useSelector } from 'react-redux';
import { handleSignin } from '../../store/actions/authActions';
import { persistor } from '../../store';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

const formBuffer = {
  email: {
    value: '',
    validations: {
      message: 'Please check Email',
      isValid: true,
    },
    touched: false,
    allowValidation: true,
    regex: regex.email,
  },
  password: {
    value: '',
    validations: {
      message: 'Please check Password',
      isValid: true,
    },
    touched: false,
    allowValidation: true,
  },
};

export default function SignIn() {
  const classes = useStyles();
  const [modelBuffer, setModelBuffer] = useState(formBuffer);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const authReducer = useSelector((state) => state.authReducer);

  if (authReducer.user.length > 0) {
    persistor.purge();
  }

  // useEffect(() => {
  //   setRememberMe(!rememberMe);
  // }, [rememberMe]);

  const handleChange = (event, value, path) => {
    const data = { ...modelBuffer };
    if (event === 'change') {
      data[path].value = value;
      data[path].validations.isValid = true;

      // Email validation has to added after the proper API setup
      // if (path === 'email') {
      //   if (value.match(data.email.regex)) {
      //     data.email.validations.isValid = true;
      //   } else {
      //     data.email.validations.isValid = false;
      //   }
      // }
    }
    setModelBuffer(data);
  };

  const doValidation = () => {
    let formValid = true;
    const data = { ...modelBuffer };
    if (!data.email.value) {
      formValid = false;
      data.email.validations.isValid = false;
    }
    if (!data.password.value) {
      data.password.validations.isValid = false;
      formValid = false;
    }
    setModelBuffer(data);
    return formValid;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (doValidation()) {
      let formData = new FormData();
      console.log(modelBuffer);
      formData.append('userName', modelBuffer.email.value);
      formData.append('password', modelBuffer.password.value);
      dispatch(handleSignin(formData));
    }
    return;
  };

  const handleSaveEmail = (e) => {
    setRememberMe(!rememberMe);
    // Function has to be decided
    // Saving in localstorage || cookies
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {authReducer.loginFailed && (
          <div className={classes.alert}>
            <Alert severity="error">Please check the given data!</Alert>
          </div>
        )}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => handleChange(e.type, e.target.value, 'email')}
            value={modelBuffer.email.value}
            error={!modelBuffer.email.validations.isValid}
            helperText={
              !modelBuffer.email.validations.isValid &&
              modelBuffer.email.validations.message
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleChange(e.type, e.target.value, 'password')}
            value={modelBuffer.password.value}
            error={!modelBuffer.password.validations.isValid}
            helperText={
              !modelBuffer.password.validations.isValid &&
              modelBuffer.password.validations.message
            }
          />
          <FormControlLabel
            onChange={handleSaveEmail}
            control={
              <Checkbox value="remember" color="primary" checked={rememberMe} />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
            disabled={
              !modelBuffer.email.validations.isValid ||
              !modelBuffer.password.validations.isValid
            }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
