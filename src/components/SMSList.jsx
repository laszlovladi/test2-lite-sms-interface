import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Spinner } from 'reactstrap';
import classnames from 'classnames';
const md5 = require('md5');

export default function SMSList(props) {

  const [smsList, setSmsList] = useState(null);
  const [smsDetailedList, setSmsDetailedList] = useState(null);
  const [activeTab, setActiveTab] = useState('1');

  function toggle(tab){
    if(activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getSMSList();
  }, []);

  useEffect(() => {
    getSMSinfo();
    // console.log(smsList);
  }, [smsList]);

  async function getSMSList(){
    try{
      let ctrl = 'sms_list'; //user_info   sms_list
      let call = new Date().getTime().toString();
      let encrPwd = md5(md5(props.credentials.password)+call);
      let service = 'sms';  //general   sms
      let from = '2000-01-01';
      let to = '2020-06-02';
      let start = 0;
      let count = 10;

      let url = `https://api.profisms.cz?CTRL=${ctrl}&_login=${props.credentials.username}&_service=${service}&_call=${call}
      &_password=${encrPwd}&from=${from}&to=${to}&start=${start}${ count !== null ? `&count=${count}` : null}`;
      const response = await fetch(url, {
        method: 'POST'
      });
      const data = await response.json();
      console.log('data.data', data.data);
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
        // let res = await fetchSMSinfo(smsList[i]);
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
          // console.log('data', data);  //, data
          list.push({
            ...data.data
          })
          console.log('list', list);
          // if(data.error.message==='OK'){
          //   setSmsList(data.data);
          // }
    
          // return data.data;
        }catch(e){
          console.error(e);
        }
      }
      setSmsDetailedList(list);
    }
    console.log('SmsDetailedList', smsDetailedList);
    // return list;
  }

  // async function fetchSMSinfo(smsId){
  //   console.log(smsId);
  //   try{
  //     let ctrl = 'sms_info'; //user_info   sms_list
  //     let call = new Date().getTime().toString();
  //     let encrPwd = md5(md5(props.credentials.password)+call);
  //     let service = 'sms';  //general   sms
  //     let id = smsId;

  //     let url = `https://api.profisms.cz?CTRL=${ctrl}&_login=${props.credentials.username}&_service=${service}&_call=${call}
  //     &_password=${encrPwd}&id=${id}`;
  //     const response = await fetch(url, {
  //       method: 'POST'
  //     });
  //     const data = await response.json();
  //     console.log('data');  //, data
  //     if(data.error.message==='OK'){
  //       setSmsList(data.data);
  //     }

  //     return data.data;
  //   }catch(e){
  //     console.error(e);
  //   }
  // }

  return (
      <div className="container">
        <h1>SMS List</h1>
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
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  {smsDetailedList !== null && smsDetailedList.length > 0 ? (
                    smsDetailedList.map((sms, i) => (
                      <Card body key={i} className="mt-1">
                        <CardTitle>{sms.sent} {sms.msisdn}</CardTitle>
                        <CardText>{sms.text}</CardText>
                        {/* <Button>Go somewhere</Button> */}
                      </Card>
                  ))) : (
                  <div>
                    <div>Loading...</div>
                    <Spinner color="primary" />
                  </div>
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <h4>No messages</h4>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
  );
}