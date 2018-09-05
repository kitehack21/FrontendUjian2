import React, {Component} from 'react';
import {Nav, Navbar, NavItem, NavDropdown, FormControl, FormGroup,  NavbarBrand, MenuItem} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {onLogout} from '../actions'
import '../css/simple-line-icons.css'

class Header extends Component{
  onSignOutClick = () =>{
    this.props.onLogout();
  }
    renderNavbar(){
      if(this.props.auth.username !== ""){
        return(
          <Navbar className="bg-dark dk" collapseOnSelect fixedTop={true}>
          <Navbar.Header >
              <NavbarBrand>
                <Link to='/'>Studio 48</Link>
              </NavbarBrand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
            <NavItem eventKey={1} href="#">
                <Link to="/TransactionHistory">Transaction History</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={3} title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
                <MenuItem eventKey={3.2} onSelect={this.onSignOutClick}>Sign Out</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        );
      }
      return(
        <Navbar className="bg-dark dk" collapseOnSelect fixedTop={true}>
        <Navbar.Header >
            <NavbarBrand>
              <Link to='/'>Studio 48</Link>
            </NavbarBrand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={2} href="#">
              <Link to="SignIn"> Sign In</Link>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <Link to="RegisterPage">Register</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ); 
    }
    render(){
      return(
        this.renderNavbar()
      );
    }
}

//state below is the Global State
const mapStateToProps = (state) => {
  const auth = state.auth;
  return {auth};
}
//export
export default connect(mapStateToProps, {onLogout})(Header);