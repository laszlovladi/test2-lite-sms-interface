import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "./LoginForm.scss";

export default function LoginForm(props) {
  // const [handleSubmit, handleChange, emptyUNmsg, emptyPWmsg] = props;

  // console.log("match", match);
  return (
      <div className="loginContainer">
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
      </div>
  );
}