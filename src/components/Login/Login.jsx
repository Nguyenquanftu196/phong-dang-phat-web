import React, { Component } from 'react';
import { Typography, withStyles, Button, CircularProgress, Card, TextField } from '@material-ui/core';
import { Classes } from 'react-jss';
import { PropTypes } from 'prop-types';
import { Auth } from '../../models/auth.js';
import { SessionUtils } from '../../utils/session';
import { styles } from './Login.style';
import { Alert } from '../Alert';

const message = "Login failed!";
const security = "error";

export const Login = withStyles(styles)(
  class extends Component {
    static propTypes = {
      classes: PropTypes.shape(Classes).isRequired,
      t: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired
    };
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        username: '',
        password: '',
        loading: false,
        open: false
      };
    }
    onChangeEmail = (e) => {
      this.setState({ email: e.target.value.toLowerCase() });
    };

    onChangePassword = (e) => {
      this.setState({ password: e.target.value });
    };

    onChangeUsername = (e) => {
      this.setState({ username: e.target.value });
    };

    onSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.login();
    };

    onCloseAlert = () => {
      this.setState({ open: false });
    }

    async login() {
      let errorUsername = false;
      let errorPassword = false;
      const { username, password } = this.state;

      this.setState({ loading: true });

      if (username.trim() === '') {
        errorUsername = true;
      }
      if (password.trim() === '') {
        errorPassword = true;
      }
      if (errorUsername || errorPassword) {
        this.setState({
          loading: false,
          errorUsername,
          errorPassword
        });
      } else {
        try {
          const session = await Auth.login(username, password);
          SessionUtils.setSessionCookie(session);
          window.location.href = '/';
        } catch (e) {
          this.setState({
            open: true,
            loading: false,
            errorUsername: true,
            errorPassword: true
          });
        }
      }
    }

    render() {
      const { classes } = this.props;
      const { username, password, loading, open } = this.state;
      return (
        <div className={classes.container}>
          <Card className={classes.card}>
            <form onSubmit={this.onSubmit} className={classes.form}>
              <Typography variant="h5" className={classes.loginLabel}>Login</Typography>
              <div>
                <TextField
                  variant="outlined"
                  id="username"
                  value={username}
                  className={classes.inputContainer}
                  InputProps={{
                    disableUnderline: true,
                    classes: { input: classes.input },
                  }}
                  onChange={this.onChangeUsername}
                  placeholder="Username"
                />
              </div>
              <div>
                <TextField
                  className={classes.inputContainer}
                  InputProps={{
                    disableUnderline: true,
                    classes: { input: classes.input },
                  }}
                  type="password"
                  id="password"
                  variant="outlined"
                  value={password}
                  onChange={this.onChangePassword}
                  placeholder="Password"
                />
              </div>
              <Button
                disabled={loading}
                color="primary"
                variant="contained"
                fullWidth
                className={classes.loginBtn}
                type="submit"
              >
                {loading ? <CircularProgress size={25} className={classes.progress} /> : 'Log In'}
              </Button>
            </form>
          </Card>
          <Alert message={message} open={open} security={security} onCloseAlert={this.onCloseAlert} />
        </div>
      );
    }
  }
);
