import React, { Component } from 'react'
import './loginRegCSS.css';
import loading from './ajax-loader.gif';
import Avatar from '../avatar/Avatar';
import { Link } from 'react-router-dom';

import {
  TextField,
  Button,
  Container
} from '@material-ui/core'

class Login extends Component {
  state = {
    userName: '',
    loginemail: '',
    loginpassword: '',
    regemail: '',
    regpassword: '',
    loggingIn: false,
    registering: false
  }

  handleTextChange = (e) => {
    const state = { ...this.state }
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  loginAPI = () => {

    const postData = { email: this.state.loginemail, password: this.state.loginpassword };
    const loginUrl = "https://puzzlrapi.herokuapp.com/login";

    fetch(loginUrl, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "200") {
          this.props.sendMessage(`You are logged in as ${data.userName}`)
          this.bake_cookie("player", data)
          this.props.addUser(data)
          this.setState({
            loggingIn: false,
            registering: false
          })
        } else console.log("error code", data.code);

      })
      .catch((error) => {
        console.log('Error: ', error);
      })
  }

  registerUser = () => {

    const postData = { userName: this.state.userName, email: this.state.regemail, password: this.state.regpassword };
    const registerUrl = "https://puzzlrapi.herokuapp.com/register";
    console.log(postData);
    fetch(registerUrl, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "200") {
          this.props.sendMessage(`You are registered as ${this.state.userName}. You can login now!`)
          this.setState({
            loggingIn: false,
            registering: false
          })
        } else {
          if(data.error.errno==1062) this.props.sendMessage("There's already somebody using that username or email address!");
          console.log("error code", data);
        } 

      })
      .catch((error) => {
        console.log('Error: ', error);
      })
  }

  bake_cookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
    console.log("set cookie!", cookie)
  }

  login = (e) => {
    e.preventDefault()
    this.setState({
      loggingIn: true
    })

    this.loginAPI();
  }

  register = (e) => {
    e.preventDefault()
    this.setState({
      registering: true
    })

    this.registerUser();
  }

  render() {
    return (
      <div className="loginDiv">

        {this.props.player ?
          <div style={{ textAlign: 'center' }}>
            <div style={{ textAlign: 'center', fontSize: 'xx-large', marginBottom: '20px' }}>Welcome back, {this.props.player.userName}<br />
            You've already solved {this.props.player.gamesPlayed} puzzles. Let's do one more!<br />
            </div>
            <Link to={`/profile/${this.props.player.userName}`} ><Avatar name={this.props.player.userName} size={200} /></Link>
          </div>
          :
          <div style={{width:'80%', display: 'inline-flex', flexDirection: 'row', justifyItems: 'space-around',alignItems:'center' }}>
            <Container maxWidth="sm">
              <form className="login-form" onSubmit={this.login}>
                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.email}
                  name="loginemail"
                  label="Email"
                  type="email" />
                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.password}
                  name="loginpassword"
                  label="Password"
                  type="password" />
                {this.state.loggingIn ?
                  <img src={loading} alt='' style={{ width: '24px' }} />
                  :
                  ''
                }
                <Button
                  type="submit"
                  className="login-button"
                  variant="contained"
                  color="primary">Login</Button>
              </form>
            </Container>
            <div style={{fontSize:'80px',fontWeight:'bold'}}>
              Or..
            </div>
            <Container maxWidth="sm">
              <form className="reg-form" onSubmit={this.register}>

                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.userName}
                  name="userName"
                  label="Username"
                  type="text" />

                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.email}
                  name="regemail"
                  label="Email"
                  type="email" />
                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.password}
                  name="regpassword"
                  label="Password"
                  type="password" />
                {this.state.registering ?
                  <img src={loading} alt='' style={{ width: '24px' }} />
                  :
                  ''
                }
                <Button
                  type="submit"
                  className="reg-button"
                  variant="contained"
                  color="primary">Register</Button>
              </form>
            </Container>
          </div>
        }
      </div>
    );
  }
}

export default Login;