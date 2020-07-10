import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withStyles, Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, DialogContentText } from '@material-ui/core';
import { styles } from './Confirm.style'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Confirm = withRouter(withTranslation()(withStyles(styles)(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes, t, open, handleClose, title, action } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          classes={{ paper: classes.mainDialog }}
        >
          <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={action} color="primary" variant="contained">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
})))
