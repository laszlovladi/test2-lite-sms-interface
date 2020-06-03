import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom'
import "./LoginForm.scss";

export default function LoginForm(props) {
  // const [handleSubmit, handleChange, emptyUNmsg, emptyPWmsg, isLoggedin, credentials] = props;

  // console.log("match", match);
  return (
      <div className="loginContainer">
        {!props.isLoggedIn ? (
        <div className="loginForm">
          <div className="loginHeader">Log in</div>
          <div className="loginBody">
            <Form onSubmit={props.handleLogin}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="Enter your username..." onChange={props.handleChange}/>
                <FormText color="danger">
                  <div id="emptyUN">{props.emptyUNmsg}</div>
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter your password..." onChange={props.handleChange}/>
                <FormText color="danger">
                  <div id="emptyPW">{props.emptyPWmsg}</div>
                </FormText>
              </FormGroup>
              <Button >Log in</Button>
            </Form>    
          </div>
        </div>
        ):(
          <div className="loginForm">          
            <div className="loginHeader">
              <h1>Hi {props.credentials.username}!</h1>
            </div>
            <div className="loginBody">
              <h2>Welcome to our awesome app ;)</h2>
              <h6>Proceed with one of the following actions:</h6>
              <div><Link to='/user-information'>User information</Link></div>                
              <div><Link to='/sms-list'>SMS List</Link></div>                
              <div><Link to='/send-sms'>Send SMS</Link></div>                
            </div>
            {/* <Form onSubmit={props.handleLogout}>
              <Button >Log out</Button>
            </Form>     */}
          </div>
        )}
      </div>
  );
}