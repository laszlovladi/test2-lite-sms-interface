import React, { useState } from "react";
import './App.css';
import NavBar from './components/NavBar.jsx'
import LoginForm from './components/LoginForm.jsx'
import UserInformation from './components/UserInformation.jsx'
import SMSList from './components/SMSList.jsx'
import SendSMS from './components/SendSMS.jsx'
import {Switch, Route, Redirect} from 'react-router-dom';
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
      let ctrl = 'user_info'; //user_info   sms_list
      let call = new Date().getTime().toString();
      let encrPwd = md5(md5(credentials.password)+call);
      let service = 'general';  //general   sms
      // let toSend = {
      //     CTRL: ctrl,
      //     _login: credentials.username,
      //     _service: service,
      //     _call: call,
      //     _password: encrPwd,
      //     from: from,
      //     to: to
      //   }
      // postLogin('https://api.profisms.cz', toSend);  // Error 50 - USER_MISSING  
      postLogin(`https://api.profisms.cz?CTRL=${ctrl}&_login=${credentials.username}&_service=${service}&_call=${call}&_password=${encrPwd}`);
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    setCredentials({
      username: '',
      password: ''
    });
    setIsLoggedin({isLoggedIn: false});
  }

  async function postLogin(url, toSend) {
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {},
        // body: JSON.stringify(toSend),
      });
      const data = await response.json();
      if(data.error.message==='OK'){
        setIsLoggedin(true);
      }

      return data;
    }catch(e){
      console.error(e);
    }
  }


  return (
    <div className="app">
      <NavBar 
        credentials={credentials}
        isLoggedIn={isLoggedIn}
      />
      <Switch>
        <Route exact path='/' render={(props) => ( 
          <LoginForm {...props}
            credentials={credentials}
            emptyUNmsg={emptyUNmsg}
            emptyPWmsg={emptyPWmsg}
            handleChange={handleChange}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        )}/>
        <Route path='/user-information' render={(props) => isLoggedIn ? ( 
          <UserInformation {...props}
            credentials={credentials}
            isLoggedIn={isLoggedIn}
          />
          ):(
            <Redirect to="/" />
          )}/>
        <Route path='/sms-list' render={(props) => isLoggedIn ?  (
          <SMSList {...props}
            credentials={credentials}
            isLoggedIn={isLoggedIn}
          />
          ):(
            <Redirect to="/" />
          )}/>  
        <Route path='/send-sms' render={(props) => isLoggedIn ? (
          <SendSMS {...props}
            credentials={credentials}
            isLoggedIn={isLoggedIn}
          />
          ):(
            <Redirect to="/" />
          )}/>
        </Switch>

    </div>
  );
}

export default App;


