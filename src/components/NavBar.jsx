import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';

export default function NavBar(props){
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navBar">
      <Navbar color="light" light expand="md"> 
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {props.isLoggedIn ? (
              <>
              <NavItem>
                <div style={{padding: '8px'}}>
                  <Link to='/'>Home</Link>
                </div>
              </NavItem>
              <NavItem>
                <div style={{padding: '8px'}}>
                  <Link to='/user-information'>User information</Link>                
                </div>
              </NavItem>
              <NavItem>
                <div style={{padding: '8px'}}>
                  <Link to='/sms-list'>SMS List</Link>                
                </div>
              </NavItem>
              <NavItem>
                <div style={{padding: '8px'}}>
                  <Link to='/send-sms'>Send SMS</Link>                
                </div>
              </NavItem>
              </>
            ):(
              <NavItem>
                <div style={{padding: '8px'}}>
                  <Link to='/'>Log in</Link>
                </div>
              </NavItem>
            )}
          </Nav>
        </Collapse>
        <NavbarBrand>Lite SMS interface</NavbarBrand>
      </Navbar>
    </div>
  );
}
