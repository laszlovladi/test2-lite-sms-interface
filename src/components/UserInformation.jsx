import React, { useState, useEffect } from "react";
import { Spinner,Toast, ToastBody, ToastHeader } from 'reactstrap';
const md5 = require('md5');

export default function UserInformation(props) {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData(){
    try{
      let ctrl = 'user_info'; //user_info   sms_list
      let call = new Date().getTime().toString();
      let encrPwd = md5(md5(props.credentials.password)+call);
      let service = 'general';  //general   sms
      let url = `https://api.profisms.cz?CTRL=${ctrl}&_login=${props.credentials.username}&_service=${service}&_call=${call}&_password=${encrPwd}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
        },
        // body: JSON.stringify(toSend),
      });
      // console.log('status', response.status);
      const data = await response.json();
      console.log('data', data);
      if(data.error.message==='OK'){
        setUserData(data);
      }

      return data;
    }catch(e){
      console.error(e);
    }
  }

  return (
      <div className="container">
        <h1>User information</h1>
        <div>
          {userData !== null && userData.data !== null ? (
            <div>
              <div>
                {userData.data.account !== null && userData.data.account.length > 0 ? (
                  <div>
                    <h3>Contacts</h3>
                    <div className="contactContainer">
                      <div className="p-3 bg-primary my-2 rounded d-flex flex-wrap">
                        {userData.data.contact.map((contact, index) => (
                          <Toast key={index}>
                            <ToastHeader>{contact.type}</ToastHeader>
                              <ToastBody>
                              <div className="accountsBody">
                                {contact.value !== "" ? <div>{contact.value}</div> : null}
                              </div>
                            </ToastBody>
                          </Toast>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  null
                )}
              </div>
              
              <div>
                {userData.data.address !== null && userData.data.address.length > 0 ? (
                  <div>
                    <h3>Address</h3>
                    <div className="addressContainer">
                      <div className="p-3 bg-primary my-2 rounded d-flex flex-wrap">
                        {userData.data.address.map((address, index) => (
                          <Toast key={index}>
                            <ToastHeader>Type {address.type}</ToastHeader>
                              <ToastBody>
                              <div className="addressBody">
                                  {address.title !== "" ? 
                                    <div><span>Title: </span>{address.title}</div> : null}
                                  {address.name !== "" ? 
                                    <div><span>Name: </span>{address.name}</div> : null}
                                  {address.surname !== "" ? 
                                    <div><span>Surname: </span>{address.surname}</div> : null}
                                  {address.company !== "" ? 
                                    <div><span>Company: </span>{address.company}</div> : null}
                                  {address.company_number !== "" ? 
                                    <div><span>Company number: </span>{address.company_number}</div> : null}
                                  {address.building_number !== "" ? 
                                    <div><span>Building number: </span>{address.building_number}</div> : null}
                                  {address.country !== "" ? 
                                    <div><span>Country: </span>{address.country}</div> : null}
                                  {address.city !== "" ? 
                                    <div><span>City: </span>{address.city}</div> : null}
                                  {address.street !== "" ? 
                                    <div><span>Street: </span>{address.street}</div> : null}
                                  {address.zip !== "" ? 
                                    <div><span>Zip: </span>{address.zip}</div> : null}
                                  {address.vat_number !== "" ? 
                                    <div><span>VAT number: </span>{address.vat_number}</div> : null}
                              </div>
                            </ToastBody>
                          </Toast>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  null
                )}
              </div>

              <div>
                {userData.data.account !== null && userData.data.account.length > 0 ? (
                  <div>
                    <h3>Accounts</h3>
                    <div className="accountsContainer">
                      <div className="p-3 bg-primary my-2 rounded d-flex flex-wrap">
                        {userData.data.account.map((account, index) => (
                          <Toast key={index}>
                            <ToastHeader>Account no. {account.number}</ToastHeader>
                              <ToastBody>
                              <div className="accountsBody">
                                {account.credit !== 0 ? 
                                  <div><span>Credit: </span>{account.credit}{account.currency}</div> : null}
                                {account.debit !== 0 ? 
                                  <div><span>Debit: </span>{account.debit}{account.currency}</div> : null}
                                <div>
                                  <h6>Payment info:</h6>
                                  {account.payment_info.account !== "" ? 
                                    <div><span>Account: </span>{account.payment_info.account}</div> : null}
                                  {account.payment_info.name !== "" ? 
                                    <div><span>Account name: </span>{account.payment_info.name}</div> : null}
                                  {account.payment_info.bank !== "" ? 
                                    <div><span>Bank: </span>{account.payment_info.bank}</div> : null}
                                  {account.payment_info.code !== "" ? 
                                    <div><span>Code: </span>{account.payment_info.code}</div> : null}
                                  {account.payment_info.iban !== "" ? 
                                    <div><span>IBAN: </span>{account.payment_info.iban}</div> : null}
                                  {account.payment_info.swift !== "" ? 
                                    <div><span>Swift: </span>{account.payment_info.swift}</div> : null}
                                  {account.payment_info.language !== "" ? 
                                    <div><span>Account: </span>{account.payment_info.language}</div> : null}
                                  {account.payment_info.country !== "" ? 
                                    <div><span>Country: </span>{account.payment_info.country}</div> : null}
                                  {account.payment_info.city !== "" ? 
                                    <div><span>City: </span>{account.payment_info.city}</div> : null}
                                  {account.payment_info.street !== "" ? 
                                    <div><span>Street: </span>{account.payment_info.street}</div> : null}
                                  {account.payment_info.zip !== "" ? 
                                    <div><span>Zip: </span>{account.payment_info.zip}</div> : null}
                                </div>
                              </div>
                            </ToastBody>
                          </Toast>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  null
                )}
              </div>
            </div>
            ):(
            <div>
              <div>Loading...</div>
              <Spinner color="primary" />
            </div>
          )}
        </div>
      </div>
  );
}