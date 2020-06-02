import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import "./NavBar.scss";


export default function NavBar(props){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navBar">
      <Navbar color="light" light expand="md"> 
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                {/* <Link to='/'>Home</Link> */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                {/* <Link to='/user-information'>User information</Link>                 */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                {/* <Link to='/sms-list'>SMS List</Link>                 */}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                {/* <Link to='/send-sms'>Send SMS</Link>                 */}
              </NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
        <NavbarBrand href="/">Lite SMS interface</NavbarBrand>
      </Navbar>
    </div>
  );
}
