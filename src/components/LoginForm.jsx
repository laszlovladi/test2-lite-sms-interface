import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import "./LoginForm.scss";

export default function LoginForm(props) {
  return (
      <div className="loginContainer">
        {!props.isLoggedIn ? (
        <Col md={4} sm={12}>
          <div className="loginForm">
            <div className="loginHeader p-3 bg-info y-2">
              <h1>Log in</h1>
            </div>
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
        </Col>
        ):(
        <Col md={4} sm={12}>
          <div className="loginForm">          
            <div className="loginHeader p-3 bg-info y-2 ">
              <h1>Hi {props.credentials.username}!</h1>
            </div>
            <div className="loginBody">
              <h2>Welcome to our awesome Lite SMS Interface ;)</h2>
              <h6>Proceed with one of the following actions:</h6>
              <div><Link to='/user-information'>User information</Link></div>                
              <div><Link to='/sms-list'>SMS List</Link></div>                
              <div><Link to='/send-sms'>Send SMS</Link></div>                
            </div>
          </div>
        </Col>
        )}
      </div>
  );
}