import React from 'react';
import Button from '../CustomButtons/Button.js'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { signup } from "../../../redux/actions/authAction";
import { connect } from "react-redux";

class Register extends React.Component {
  state = {
    open: false,
    username: "",
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
    const {username, email, password} = this.state;
    const newUserData = {
      email,
      password,
      confirmPassword: password,
      handle: username
    };
    this.props.signup(newUserData);
  };

  handleChange = async (event) => {
    await this.setStateAsync({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <Button
                variant = "outlined"
                color="primary"
                onClick={this.handleClickOpen}
                round>
          Register
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"

        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Register!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Welcome!. Thank you for signing up with us. :)
              </DialogContentText>
               <TextField
                autoFocus
                margin="dense"
                id="name"
                name="username"
                label="Username"
                type="text"
                value={username}
                onChange={this.handleChange}
                fullWidth
                color="secondary"
              />
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={this.state.email}
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
                Register
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signup,
};

export default connect(null, mapDispatchToProps)(Register)