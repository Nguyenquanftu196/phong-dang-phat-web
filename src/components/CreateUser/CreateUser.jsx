import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  withStyles,
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormHelperText,
  DialogActions,
} from '@material-ui/core';
import { styles } from './CreateUser.style';
import { withRouter } from 'react-router-dom';
import { User } from '../../models/user';
import { Alert } from '../Alert';

const message = "Create user successfully!";
const security = "success";

export const CreateUser = withRouter(
  withTranslation()(
    withStyles(styles)(
      class extends Component {
        static propTypes = {
          classes: PropTypes.shape(Classes).isRequired,
          t: PropTypes.func.isRequired,
          location: PropTypes.object.isRequired
        };

        constructor(props) {
          super(props);

          this.state = {
            openModal: false,
            open: false,
            username: '',
            password: '',
            email: '',
            status: '',
            teamId: '',
            contractNumber: '',
            contractExpDate: '',
            isAdmin: '',
            loading: false,
            errorUsername: false,
            errorPassword: false,
            errorEmail: false,
            errorStatus: false,
            errorContractNumber: false,
            errotContractExpDate: false,
            errorActive: false,
          };
        }
        
        toggleModal = () => {
          const { openModal } = this.state;
          this.setState({ openModal: !openModal })
        }
        onDateChange = (e) => {
          this.setState({ contractExpDate: e.target.value });
        }
        onChangeUsername = (e) => {
          this.setState({ username: e.target.value })
        }
        onChangePassword = (e) => {
          this.setState({ password: e.target.value });
        }
        onChangeEmail = (e) => {
          this.setState({ email: e.target.value })
        }
        onChangeStatus = (e) => {
          this.setState({ status: e.target.value })
        }
        onChangeContractNumber = (e) => {
          this.setState({ contractNumber: e.target.value })
        }
        onChangeIsAdmin = (e) => {
          this.setState({ isAdmin: e.target.value })
        }
        onCloseAlert = () => {
          this.setState({ open: false });
        }

        createUser = async () => {
          const {
            username, password, email, teamId, contractNumber, contractExpDate, isAdmin
          } = this.state
          const queryParams = {
            username, password, email, teamId, contractNumber, contractExpDate, isAdmin
          }
          let errorUsername = false;
          let errorPassword = false;
          let errorEmail = false;
          let errorStatus = false;
          let errorContractNumber = false;
          let errorContractExpDate = false;

          if (password.trim() === '') {
            errorPassword = true;
          }
          if (username.trim() === '') {
            errorUsername = true;
          }
          if (email.trim() === '') {
            errorEmail = true;
          }
          if (contractNumber.trim() === '') {
            errorContractNumber = true;
          }
          if (contractExpDate.trim() === '') {
            errorContractExpDate = true;
          }

          if (errorPassword || errorUsername || errorEmail
            || errorStatus || errorContractNumber || errorContractExpDate) {
            this.setState({
              loading: false,
              errorPassword,
              errorUsername,
              errorEmail,
              errorStatus,
              errorContractNumber,
              errorContractExpDate,
            })
          } else {
            try {
              this.setState({ loading: true })
              const user = await User.create(queryParams);
              if (user) {
                this.setState({ loading: false, open: true }, () => {
                  this.props.fetchUsers();
                })
              }
            } catch (error) {
              console.log(error)
            }
          }
        }

        render() {
          const { classes, t, openModal } = this.props;
          const {
            username, password, email, contractNumber, contractExpDate,
            errorEmail, errorPassword, errorContractNumber, errorContractExpDate, errorUsername, errorActive, open
          } = this.state

          return (
            <div>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={openModal}
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onExit={this.exitDialog}
              >
                <DialogTitle id="form-dialog-title">{t('Create new user')}</DialogTitle>
                <DialogContent onClick={e => e.stopPropagation()} className={classes.dialogContent}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Username"
                        type="username"
                        onChange={this.onChangeUsername}
                        value={username}
                        variant="outlined"
                        InputProps={{
                          classes: { input: classes.input },
                          disableUnderline: true,
                        }} />
                      {errorUsername && <FormHelperText className={classes.error}>{t('Invalid username')}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={this.onChangePassword}
                        variant="outlined"
                        InputProps={{
                          classes: { input: classes.input },
                          disableUnderline: true,
                        }} />
                      {errorPassword && <FormHelperText className={classes.error}>{t('Invalid password')}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        onChange={this.onChangeEmail}
                        value={email}
                        variant="outlined"
                        InputProps={{
                          classes: { input: classes.input },
                          disableUnderline: true,
                        }} />
                      {errorEmail && <FormHelperText className={classes.error}>{t('Invalid email')}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Contract number"
                        onChange={this.onChangeContractNumber}
                        value={contractNumber}
                        variant="outlined"
                        InputProps={{
                          classes: { input: classes.input },
                          disableUnderline: true,
                        }} />
                      {errorContractNumber && <FormHelperText className={classes.error}>{t('Invalid contract number')}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="date"
                        onChange={this.onDateChange}
                        label="Contract Exp Date"
                        type="date"
                        variant="outlined"
                        value={contractExpDate}
                        className={classes.textField}
                        InputProps={{
                          classes: { input: classes.input },
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      {errorContractExpDate && <FormHelperText className={classes.error}>{t('Invalid date')}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel className={classes.label}>
                          {t('isAdmin')}
                        </InputLabel>
                        <Select
                          fullWidth
                          inputProps={{
                            classes: { root: classes.select }
                          }}
                          onChange={this.onChangeIsAdmin}
                        >
                          <MenuItem value={1}>Yes</MenuItem>
                          <MenuItem value={0}>No</MenuItem>
                        </Select>
                        {errorActive && <FormHelperText className={classes.error}>{t('Invalid active status')}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions classes={{ root: classes.dialogActionRoot }}>
                  <Button onClick={this.props.onClose} color="primary">
                    Cancel
                   </Button>
                  <Button onClick={this.createUser} color="primary" autoFocus>
                    Create
                  </Button>
                </DialogActions>
              </Dialog>
              <Alert message={message} open={open} security={security} onCloseAlert={this.onCloseAlert} />
            </div >
          );
        }
      }
    )
  )
);
