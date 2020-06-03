import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Spinner,
  Form, FormGroup, Input, Label } from 'reactstrap';
import classnames from 'classnames';
const md5 = require('md5');

export default function SMSList(props) {

  const [smsList, setSmsList] = useState(null);
  const [smsDetailedList, setSmsDetailedList] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    startDate: '',
    endDate: '',
    startSelect: '',
    countSelect: '',
  });

  function toggle(tab){
    if(activeTab !== tab) setActiveTab(tab);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setSmsDetailedList(null);
    getSMSList();
  }

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    getSMSinfo();
  }, [smsList]);

  async function getSMSList(){
    try{
      let ctrl = 'sms_list'; //user_info   sms_list
      let call = new Date().getTime().toString();
      let encrPwd = md5(md5(props.credentials.password)+call);
      let service = 'sms';  //general   sms
      let from = input.startDate;
      let to = input.endDate;

      let url = `https://api.profisms.cz?CTRL=${ctrl}&_login=${props.credentials.username}&_service=${service}&_call=${call}&`
        +`_password=${encrPwd}&from=${from}&to=${to}`
        +`${ input.startSelect !== undefined && input.startSelect !== '' ? `&start=${input.startSelect}` : ''}`
        +`${ input.countSelect !== undefined && input.countSelect !== '' ? `&count=${input.countSelect}` : ''}`;

      const response = await fetch(url, {
        method: 'POST'
      });
      const data = await response.json();
      if(data.error.message==='OK'){
        setSmsList(data.data);
      }

      return data;
    }catch(e){
      console.error(e);
    }
  }

  async function getSMSinfo(){
    if(smsList !== null && smsList.length > 0){
      let list = []
      for(let i=0; i < smsList.length; i+=1){
        try{
          let ctrl = 'sms_info'; //user_info   sms_list
          let call = new Date().getTime().toString();
          let encrPwd = md5(md5(props.credentials.password)+call);
          let service = 'sms';  //general   sms
          let id = smsList[i];
    
          let url = `https://api.profisms.cz?CTRL=${ctrl}&_login=${props.credentials.username}&_service=${service}&_call=${call}
          &_password=${encrPwd}&id=${id}`;
          const response = await fetch(url, {
            method: 'POST'
          });
          const data = await response.json();
          list.push({
            ...data.data
          })
        }catch(e){
          console.error(e);
        }
      }
      setSmsDetailedList(list);
    }
    setIsLoading(false);

  }

  return (
      <div className="container">
        <h1>SMS List</h1>
        <Col md={6} sm={12}>
          <Form onSubmit={handleSubmit} className="p-3 bg-info my-2 rounded">
            <Row form>
              <Col md={6} sm={12}>
                <FormGroup className="mb-2 mr-sm-1 mb-sm-0" className="m-2">
                  <Label for="startDate">From</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="date placeholder"
                    onChange={handleChange}
                  />
                </FormGroup >
              </Col>
              <Col md={6} sm={12}>
              <FormGroup className="mb-2 mr-sm-1 mb-sm-0" className="m-2">
                  <Label for="endDate">Till</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="date placeholder"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>   
              </Row>            
              <Row form>
                <Col md={6} sm={12}>
                <FormGroup className="mb-2 mr-sm-1 mb-sm-0"  className="m-2">
                  <Label for="countSelect">Count</Label>
                  <Input type="select" name="countSelect" id="countSelect" onChange={handleChange}>
                    <option></option>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </Input>
                </FormGroup>
                </Col>  
                <Col md={6} sm={12}>
                <FormGroup className="mb-2 mr-sm-1 mb-sm-0"  className="m-2">
                  <Label for="startSelect">Start</Label>
                  <Input type="select" name="startSelect" id="startSelect" onChange={handleChange}>
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>  
                </Col>   
              </Row>            
              <Button className="m-2">Submit</Button>
            </Form>  
          </Col>       
          <div>
          
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Sent
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Received
              </NavLink>
            </NavItem>
          </Nav>

          {isLoading ? (
            <div> 
              <div>Loading...</div>
              <Spinner color="primary" />
            </div>
          ) : (
          <TabContent activeTab={activeTab} className="p-3 bg-info my-2 rounded">
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  {smsDetailedList !== null && smsDetailedList.length > 0 ? (
                    smsDetailedList.map((sms, i) => (
                      <Card body key={i} className="mt-1">
                        <CardTitle>{sms.sent} {sms.msisdn}</CardTitle>
                        <CardText>{sms.text}</CardText>
                      </Card>
                  ))) : (
                    ""
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          )}
        </div>
      </div>
  );
}