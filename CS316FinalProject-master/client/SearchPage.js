import React from 'react';
import resAccessor from '../accessor/resAccessor.js';
import offeringAccessor from '../accessor/offeringAccessor.js';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

var titleStyle = {
  color: 'black',
  fontSize: '100px',
  textAlign: 'center'
};

var wordStyle = {
  color: 'darkslateblue',
  fontSize: '40px',
  position: 'relative',
  left: '400px',
};

var pmStyle={color: 'darkslateblue',
  fontSize: '20px',
  position: 'relative',
  left: '40px',
  };

var emptyStyle = {
  width: '100px',
  height: '100px'
};

var inputStyle = {
  width: '200px',
  height: '40px'
};

var inputStyle1 = {
  width: '200px',
  height: '40px',
  position: 'relative',
  left: '400px'
};

var pminputStyle = {
  width: '150px',
  height: '20px',
  position: 'relative',
  left: '35px',
  top:'-10px'
};

var noStyle = {
  position: 'relative',
  left: '400px',
  color: 'red'
};

var buttonStyle = {
  width: '200px',
  height: '30px',
  position: 'relative',
  left: '275px'
};

var addButtonStyle = {
  width: '200px',
  height: '30px',
  position: 'relative',
  left: '20px'
};

var pmbuttonStyle = {
  width: '100px',
  height: '28px',
  position: 'relative',
  left: '-90px'

};

var linkStyle = {
  color: 'lawngreen',
  backgroundColor: 'indigo',
  fontSize: '40px',
  position: 'absolute',
  left: '150px'
};

var deleteStyle = {
  color: 'red',
  backgroundColor: 'black',
  position: 'absolute',
  left: '700px'
};

var updateStyle = {
  color: 'pink',
  backgroundColor: 'black',
  position: 'absolute',
  left: '900px'
};

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr_res: '',
      searchStr_off: '',
      resInfo: null,
      offInfo: null,
      resList: null,
      permission_number: "",
      logged:false,
    };
    this.handleSubmit_res = this.handleSubmit_res.bind(this);
    this.handleSubmit_off = this.handleSubmit_off.bind(this);
    this.updateState_res = this.updateState_res.bind(this);
    this.updateState_off = this.updateState_off.bind(this);
    this.getAllRestaurant = this.getAllRestaurant.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateState_pm = this.updateState_pm.bind(this);
  }

  async handleLogin() {
    let loginInfo = await resAccessor.getLoginInfo({permission_number: this.state.permission_number});

    //console.log(loginInfo);
    this.props.onLoginInfoChange(loginInfo);
    this.props.history.push('/loginpage');
    if (loginInfo.status == 'success'){
      console.log("login successful!");
      this.state.logged = true;
    }
  }

  handleLogout(){
    this.props.onLogoutInfoChange();
    console.log("log out successful!");
    this.props.history.push('/');
  }

  updateState_pm(event) {
    this.setState({permission_number: event.target.value});
  }

  async handleSubmit_res() {
    var input=this.state.searchStr_res;
    var inputWords=input.split(' ');
    for (var i=0;i<inputWords.length;i++){
       var curr=inputWords[i];
       if (curr=="the" || curr=="and" || curr=="or" || curr=="with"||curr=="of"){
           continue;
       }
       var new_curr=curr.substring(0,1).toUpperCase()+curr.substring(1);
       inputWords[i]=new_curr;

    }
    input=inputWords.join(" ");
    console.log(input);
    let resInfo = await resAccessor.getRestaurantByName({name: input});


    // this.setState({
    //   resInfo: info,
    //   //clear the search bar once submitted
    //   searchStr: '',
    // });
    console.log(this.props);
    this.props.onResInfoChange(resInfo);
    this.props.history.push('/restaurants');
  }
  async handleSubmit_off() {
    var input=this.state.searchStr_off;
    var inputWords=input.split(' ');
    for (var i=0;i<inputWords.length;i++){
       var curr=inputWords[i];
       if (curr=="the" || curr=="and" || curr=="or" || curr=="with"||curr=="of"){
           continue;
       }
       var new_curr=curr.substring(0,1).toUpperCase()+curr.substring(1);
       inputWords[i]=new_curr;

    }
    input=inputWords.join(" ");
    console.log(input);
    let offInfo = await offeringAccessor.searchByOfferingName({name: input});

    // this.setState({
    //   resInfo: info,
    //   //clear the search bar once submitted
    //   searchStr: '',
    // });
    this.props.onOffInfoChange(offInfo);
    this.props.onSearchStringoffChange(this.searchStr_off);
    this.props.history.push('/offering');
  }


  updateState_res(event) {
    //console.log('change!', event.target.value)
    this.setState({searchStr_res: event.target.value});
  }
  updateState_off(event) {
    //console.log('change!', event.target.value)
    this.setState({searchStr_off: event.target.value});
  }

  async getAllRestaurant() {
    let allRes = await resAccessor.getResList();
    this.setState({resList: allRes.data});
  }

  componentDidMount() {
    this.getAllRestaurant();
  }

  addRestaurant() {
    this.props.history.push('/addRestaurant')
  }

  async deleteRestaurant(id) {
    let response = await resAccessor.deleteRestaurant(id);
    if (response.status === 'success') {
      this.getAllRestaurant();
    }
  }

  async updateRestaurant(id) {
    this.props.history.push(`/updateRestaurant/${id}`)
  }



  render() {
    console.log(this.state.resList);
    var loginPart;
    var addButton;
    if (this.state.resList) {
      // This is login section;
      if (this.props.authProp){
        loginPart =
        <div>
        <br></br>
          <div style={pmStyle}> Welcome, administrator! </div>
          <button onClick={this.handleLogout} style={pmbuttonStyle}>
            Log out!
          </button>
        </div>
      }
      else{
        loginPart =
        <div>
          <br></br>
          <div>

            <h3 style={pmStyle}> Permission Number :</h3>
            <input type = "text" value = {this.state.permission_number} onChange={this.updateState_pm} style={pminputStyle}/>
          </div>
          <button onClick={this.handleLogin} style={pmbuttonStyle}>
            Let Me In!
          </button>
        </div>
      }

      if (this.props.authProp){
        addButton =   <button onClick={this.addRestaurant} style={addButtonStyle}>
            Add a restaurant
          </button>

      }

      return (
        <div>

          <div> {loginPart} </div>

           <br/>
           <br/>

          <div>
            <div style={wordStyle}>Search by restaurant:
              <br/>
              <input type="text" value={this.state.searchStr_res} onChange={this.updateState_res} style={inputStyle}/>
            </div>
            <br/>
            <button onClick={this.handleSubmit_res} style={buttonStyle}>
              Search Restaurant
            </button>
            <div style={noStyle}>
              {this.state.resInfo ? this.state.resInfo.status : 'No search yet'}
            </div>
            <br/>
          </div>
          <br/>

          <div>
            <div style={wordStyle}>Search by offering:
              <br/>
              <input type="text" value={this.state.searchStr_off} onChange={this.updateState_off} style={inputStyle}/>
            </div>
            <br/>
            <button onClick={this.handleSubmit_off} style={buttonStyle}>
              Search Offering
            </button>
            <div style={noStyle}>
              {this.state.offInfo ? this.state.offInfo.status : 'No search yet'}
            </div>
            <br/>
          </div>
          <br/>


          <div className="DrawAllRestaurants">{
            this.state.resList.map((restaurant, index) =>
              <RestaurantLink
                key={index}
                authorized={this.props.authProp}
                resLinkProp={restaurant}
                deleteProp={this.deleteRestaurant}
                updateProp={this.updateRestaurant}
              />
            )
          }
          </div>

          <div>
            {addButton}
          </div>
          <br></br>
          <br></br>
          <br></br>


        </div>
      );
    }
    return null;
  }
}

class RestaurantLink extends React.Component {

  render () {
    var deleteButton;
    var updateButton;
   let loginInfo=this.props.authorized;




     if (loginInfo){
       deleteButton=<button onClick={() => this.props.deleteProp(resId)} style={deleteStyle}>
        Delete
      </button>

      updateButton=<button onClick={() => this.props.updateProp(resId)} style={updateStyle}>
            Update
          </button>

     }

    let resId = this.props.resLinkProp.id;
    return (
    <div>
      <div>
        <div>
          <Link to={`/restaurants/${resId}`} style={linkStyle}>
            {this.props.resLinkProp.name}
          </Link>
          {deleteButton}
          {updateButton}
        </div>
        <div style={emptyStyle}> </div>
      </div>
      </div>
    )
  }
}

export default withRouter(SearchPage);
