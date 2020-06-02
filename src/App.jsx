import React, { useState } from "react";
import './App.css';
import NavBar from './components/NavBar.jsx'
import LoginForm from './components/LoginForm.jsx'
import UserInformation from './components/UserInformation.jsx'
import SMSList from './components/SMSList.jsx'
import SendSMS from './components/SendSMS.jsx'
import {Switch, Route} from 'react-router-dom';
const md5 = require('md5');

function App() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [emptyUNmsg, setEmptyUNmsg] = useState('');
  const [emptyPWmsg, setEmptyPWmsg] = useState('');
  const [isLoggedIn, setIsLoggedin] = useState(false);

  function validateForm() {
    setEmptyUNmsg(credentials.username.length === 0 ? "'Username' cannot be empty" : '');
    setEmptyPWmsg(credentials.password.length === 0 ? "'Password' cannot be empty" : '');
    return credentials.username.length > 0 && credentials.password.length > 0;
  }

  function handleChange(e){
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    if(validateForm()){
      let ctrl = 'sms_list'; //user_info   sms_list
      let call = new Date().getTime().toString();
      let encrPwd = md5(md5(credentials.password)+call);
      let service = 'sms';  //general
      let from = '2000-01-01';
      let to = '2020-06-02';
      console.log('credentials', credentials);
      // postLogin('https://api.profisms.cz', call, encrPwd);  // Error 50 - USER_MISSING  
      postLogin(`https://api.profisms.cz?CTRL=${ctrl}&_login=${credentials.username}&_service=${service}&_call=${call}&_password=${encrPwd}
        &from=${from}&to=${to}
        `);
    }
  }

  async function postLogin(url, call, encrPwd) {
    try{
      console.log('credentials.username', credentials.username);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CTRL: "user_info",
            _login: unescape(encodeURIComponent(credentials.username)),
            _service: 'general',
            _call: call,
            _password: encrPwd,
          }),
      });
      console.log('status', response.status);
      const data = await response.json();
      console.log('data', data);
      if(data.error.code===0){
        console.log('data.error.code', data.error.code);
        setIsLoggedin(true);
      }

      return data;
    }catch(e){
      console.error(e);
    }
  }


  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route exact path='/' render={(props) => ( //component={LoginForm} 
          <LoginForm {...props}
            credentials={credentials}
            emptyUNmsg={emptyUNmsg}
            emptyPWmsg={emptyPWmsg}
            handleChange={handleChange}
            handleLogin={handleLogin}
          />
        )}/>
        <Route path='/user-information' component={UserInformation}/>
        <Route path='/sms-list' component={SMSList}/>
        <Route path='/send-sms' component={SendSMS}/>
      </Switch>

    </div>
  );
}

export default App;


