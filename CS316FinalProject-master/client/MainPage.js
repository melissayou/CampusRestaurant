import React from 'react';
import resAccessor from '../accessor/resAccessor.js';
import offeringAccessor from '../accessor/offeringAccessor.js';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import SearchPage from './SearchPage.js';
import RestaurantPage from './RestaurantPage.js';
import OfferingPage from './OfferingPage.js';
import RestaurantDisplay from './RestaurantDisplay.js';
import AddRestaurant from './AddRestaurant.js';
import UpdateRestaurant from './UpdateRestaurant.js';
import LoginPage from './LoginPage.js';

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addResId: null,
      updateResId: null,
    };
    this.resInfo = null;
    this.offInfo = null;
    this.searchStr_off = '';
    this.resList = null;
    this.loginInfo = null;
    this.authorized = false;
    this.onLoginInfoChange = this.onLoginInfoChange.bind(this);
    this.onLogoutInfoChange = this.onLogoutInfoChange.bind(this);
    this.onAddResIdChange = this.onAddResIdChange.bind(this);
    this.onResInfoChange = this.onResInfoChange.bind(this);
    this.onOffInfoChange = this.onOffInfoChange.bind(this);
    this.onSearchStringoffChange = this.onSearchStringoffChange.bind(this);
    this.onUpdateResIdChange = this.onUpdateResIdChange.bind(this);
  }

  onAddResIdChange(resId) {
    this.setState({addResId: resId})
  }

  onUpdateResIdChange(resId) {
    this.setState({updateResId: resId});
  }

  onResInfoChange(resInfo) {
    this.resInfo = resInfo;
  }

  onLoginInfoChange(loginInfo) {
    this.loginInfo = loginInfo;
    if (loginInfo){
      if (loginInfo.status == 'success'){
        this.authorized = true;
      }
    }
  }

  onLogoutInfoChange(){
    this.authorized = false;
  }

  onOffInfoChange(offInfo) {
    this.offInfo = offInfo;
  }

  onSearchStringoffChange(searchStr_off) {
    this.searchStr_off = searchStr_off;
  }

  render() {
    const loginPage = () =>{
      console.log("switch to login page");
      return <LoginPage loginInfoProp={this.loginInfo} />;
    }
    const restaurantPage = () => {
      console.log("draw res page");
      return <RestaurantPage resInfoProp={this.resInfo}/>;
    };
    //resInfo={this.state.resInfo}
    const searchPage = () => {
      console.log("switch to main page");
      return <SearchPage authProp ={this.authorized} onLogoutInfoChange={this.onLogoutInfoChange} onLoginInfoChange={this.onLoginInfoChange} onResInfoChange={this.onResInfoChange} onOffInfoChange={this.onOffInfoChange} onSearchStringoffChange={this.onSearchStringoffChange}/>
    };

    const offeringPage = () => {
      console.log("switch to offering page");
      return <OfferingPage offInfoProp={this.offInfo} offStringProp={this.searchStr_off}/>
    }

    const restaurantDisplay = ({match}) => {
      console.log("switch to restaurant display page");
      if (match.params.id) {
        console.log(match.params.id);
        return <RestaurantDisplay authProp ={this.authorized} resIdProp={match.params.id}/>
      } else {
        return <RestaurantDisplay authProp ={this.authorized} resIdProp={match.params.resid}/>
      }
    }

    const addRestaurant = () => {
      console.log("switch to add restaurant page");
      let id = this.state.addResId;
      this.state.addResId = null; // hack!!!! usually can't change state, must use setState.
      return (
        id != null
          ? <Redirect to={`/restaurants/${id}`}/>
          : <AddRestaurant onAddResIdChangeProp={this.onAddResIdChange}/>
      );
    }

    const updateRestaurant = ({match}) => {
      console.log("switch to updateRestaurant page");
      let id = this.state.updateResId;
      this.state.updateResId = null;
      return (
        id != null
          ? <Redirect to={`/restaurants/${id}`}/>
          : <UpdateRestaurant resIdProp={match.params.id} onUpdateResIdChangeProp={this.onUpdateResIdChange}/>
      )
    }

    return (
      <div>

      <div>
        <Router>
          <main>
            <Switch>
              <Route exact path="/" component={searchPage} />
              <Route path="/restaurants" exact component={restaurantPage} />
              <Route path="/loginpage" exact component={loginPage} />
              <Route path="/restaurants/:id" component={restaurantDisplay}/>
              <Route path="/offering" exact component={offeringPage} />
              <Route path="/offering/:resid" component={restaurantDisplay}/>
              <Route path="/addRestaurant" component={addRestaurant}/>
              <Route path="/updateRestaurant/:id" component={updateRestaurant}/>
            </Switch>
          </main>
        </Router>
        </div>
      </div>
    );
  }
}


export default MainPage;
