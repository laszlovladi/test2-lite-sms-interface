import React, { useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
const md5 = require('md5');

export default function SendSMS(props) {

  const [smsStatus, setSmsStatus] = useState('');
  const [input, setInput] = useState({
    phone: null,
    text: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    sendSMS();
  }

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  async function sendSMS(){
    try{
      let ctrl = 'sms_list'; //user_info   sms_list
      let call = new Date().getTime().toString();
      let encrPwd = md5(md5(props.credentials.password)+call);
      let service = 'sms';  //general   sms

      let url = `https://api.profisms.cz?CTRL=${ctrl}&_login=${props.credentials.username}&_service=${service}&_call=${call}&`
        +`_password=${encrPwd}&msisdn=${input.phone}&text=${input.text}`;

      const response = await fetch(url, {
        method: 'POST'
      });
      const data = await response.json();
      if(data.error.message==='OK'){
        setSmsStatus("Your message has been sent");
      }else{
        setSmsStatus("Error: "+data.error.message);
      }

      return data;
    }catch(e){
      console.error(e);
    }
  }

  return (
      <div className="container">
        <h1>SendSMS</h1>
          <Form onSubmit={handleSubmit} className="p-3 bg-info my-2 rounded">
            <FormGroup>
              <Label for="exampleEmail">Phone:</Label>
              <Input type="tel" name="phone" id="phone" placeholder="phone number" onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="text">Text:</Label>
              <Input type="textarea" name="text" id="text" placeholder="enter message here..." maxLength="1000" onChange={handleChange}/>
            </FormGroup>
              <FormText>{smsStatus}</FormText>
            <Button className="m-2">Submit</Button>
          </Form>         
        <div>
      </div>
    </div>
  );
}