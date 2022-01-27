import React, { Component } from 'react'
import Keycloak from 'keycloak-js'
import axiosInstance from './intercept'

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false }
  }

  componentDidMount() {
    const keycloak =Keycloak('/keycloak.json');
    keycloak.init({onLoad:'login-required'}).then(authenticated =>{
      this.setState({keycloak:keycloak,authenticated:authenticated})
      if(authenticated){
       console.log('token',keycloak.token)
        window.accessToken=keycloak.token
      }
    })
  }


  render() {
    if(this.state.keycloak){
      if(this.state.authenticated) return (
        <div>
          <p>this is a secured component of your app</p>
      
        </div>
      ); else return ( <div>unable to authenticate!</div>)
    }
    return (
      <div>
        <h1>initializing keycloak</h1>
    
      </div>
    )
  }
}
export default Secured