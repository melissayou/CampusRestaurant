import React from 'react';
import resAccessor from '../accessor/resAccessor.js';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

var congStyle = {
  color: 'red',
  fontSize: '100px',
  textAlign: 'center'
};

var linkStyle = {
  color: 'forestgreen',
  fontSize: '30px',
  backgroundColor: 'orange',
  position: 'relative',
  left: '40px',
  padding: '5px'
};

//for a restaurant with all info
class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    //this.login = null;
  }


  render() {
    if (this.props.loginInfoProp.status == 'success'){
      //this.login = this.props.loginInfoProp;
      return (
        <div>
            <p style={congStyle}> Congratulations! You are authorized. </p>
              <Link to={`/`} style={linkStyle}>
                 Back
              </Link>
              <br></br>
        </div>
      )
    }
    else{
      return (
        <div>
          <p style={congStyle}>Sorry, you are not authorized. </p>
          <h3>
            <Link to={`/`} style={linkStyle}>
               Back
            </Link>
            </h3>
        </div>
      )
    }
  }
}

export default LoginPage;
