import React, { Component } from 'react';
import {Route, withRouter } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import HomePage from './components/HomePage'
import SignIn from './components/SignIn'
import RegisterPage from './components/RegisterPage'
import TransactionHistory from './components/TransactionHistory';
import {connect} from 'react-redux'
import Cookies from 'universal-cookie'
import {keepLogin, cookieChecked} from './actions'

import './App.css';
import './css/bootstrap.css'
import './css/animate.css'
import './css/font-awesome.min.css'
import './css/app.css'
import './css/font.css'
import './css/simple-line-icons.css'
import './css/AdminLTE.css'

const cookies = new Cookies();

class App extends Component {

  componentWillMount(){
    const theCookie = cookies.get('myCookie');
    if(theCookie !== undefined){
      this.props.keepLogin(theCookie)
    }
    else{
      this.props.cookieChecked();
    }
    console.log(this.props.auth.cookieCheck)
    console.log(this.props.auth)
  }
  
  componentWillReceiveProps(newProps){
    if(newProps.auth.username === ""){
      cookies.remove("myCookie")
    }
  }

  render() {
    if(this.props.auth.cookieCheck === true){
      return (
        <div className="App">
          <Header/>
          <div>
              <Route exact path="/" component = {HomePage}/>
              <Route path="/SignIn" component = {SignIn}/>
              <Route path="/RegisterPage" component = {RegisterPage}/>
              <Route path="/TransactionHistory" component = {TransactionHistory}/>
            </div>  
        </div>
    );
    }
    return <div>Authentication Checking</div>
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return {auth};
}

export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked})(App));
