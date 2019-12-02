import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { login } from "../../../redux/actions/authAction";

class LogIn extends React.Component {
  state = {
    open: false,
    email: "",
    password: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    const userData = {
      email,
      password,
    };
    this.props.login(userData);
  };

  handleChange = async (event) => {
    await this.setStateAsync({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          Log in
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Log in!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Great to see you again!. Please input your log in details below.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={this.handleChange}
                fullWidth
                color="secondary"
              />
                <TextField
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={this.handleChange}
                fullWidth
                color="secondary"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={this.handleClose}
                color="primary"
              >
                Log in
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapActionsToProps = {
  login
};

export default connect(
  null,
  mapActionsToProps
)(LogIn);