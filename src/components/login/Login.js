import React, { Component } from 'react'
import './loginRegCSS.css';
import loading from './ajax-loader.gif';

import {
  TextField,
  Button,
  Container
} from '@material-ui/core'

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  }

  handleTextChange = (e) => {
    const state = { ...this.state }
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  loginAPI = () => {
  
    const postData = {email: this.state.email,password: this.state.password };
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
        if (data.code=="200") {
        this.props.sendMessage(`You are logged in as ${data.userName}`)
        this.props.addUser(data)
        this.setState({
            loading: false
        })
        } else console.log("error code",data.code);

    })
    .catch((error) => {
        console.log('Error: ', error);
    })
}

  login = (e) => {
    e.preventDefault()
    this.setState({
        loading: true
    })
    // set cookie here
    // set loggedIn = true and max-age = (one hour)
    document.cookie = "loggedIn=true;max-age=3600*1000";
    // window.location.replace("/")
    this.loginAPI();
  }

  render() {
    return (
      <div className="loginDiv">
        <Container maxWidth="sm">
          <form className="login-form" onSubmit={this.login}>
            <TextField
              required
              onChange={this.handleTextChange}
              value={this.state.email}
              name="email"
              label="email"
              type="email" />
            <TextField
              required
              onChange={this.handleTextChange}
              value={this.state.password}
              name="password"
              label="Password"
              type="password" />
              {this.state.loading ?
              <img src={loading} alt='' style={{width:'24px'}}/>
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
        {this.props.player ?
            <div style={{textAlign:'center'}}>Welcome back, {this.props.player.userName}</div>
            :
            ''
            }
      </div>
    );
  }
}

export default Login;