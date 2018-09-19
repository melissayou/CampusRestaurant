import React from 'react';
import resAccessor from '../accessor/resAccessor.js';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

var colorStyle = {
  color: 'indigo',
  fontSize: '30px',
  textAlign: 'center'
};


//a list of restaurants
class RestaurantListPage extends React.Component {
  render () {
    if (this.props.listProp) {
      return (
         <div style={colorStyle}>{
           _.map(
             this.props.listProp,
             (restaurant) => <RestaurantRow
               key={restaurant.name}
               restaurantRowProp={restaurant}
               isDisplayOffering={this.props.isDisplayOffering}
             />
           )
         }
         </div>
      );
    }
    return null;
  }
}

//for each restaurant
class RestaurantRow extends React.Component {
  render () {
    if (this.props.isDisplayOffering) {
      return (
        <div className="ByRestaurant">
          <h3>
            <Link to={`/offering/${this.props.restaurantRowProp.id}`}>
              {this.props.restaurantRowProp.name}
            </Link>
          </h3>

          <div className="RestaurantBasicInfo">
           <p>{this.props.restaurantRowProp.location}</p>
           <p>{this.props.restaurantRowProp.origin}</p>
           <p>{this.props.restaurantRowProp.time}</p>
          </div>

          <div className="eachOffering">
           <ul>{
             _.map(
               this.props.restaurantRowProp.specific_offering,
               (dish) => <OfferingRow offeringRowProp={dish}
               key={dish.offering_name}/>
             )
           }</ul>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h3>
            <Link to={`/restaurants/${this.props.restaurantRowProp.id}`}>
              {this.props.restaurantRowProp.name}
            </Link>
          </h3>

          <div className="RestaurantBasicInfo">
            <p>{this.props.restaurantRowProp.location}</p>
            <p>{this.props.restaurantRowProp.origin}</p>
            <p>{this.props.restaurantRowProp.time}</p>
          </div>
        </div>
      );
    }
  }
}

class OfferingRow extends React.Component {
  render () {
    return (
      <div>
        {this.props.offeringRowProp.offering_name},
        {this.props.offeringRowProp.offering_price}
      </div>
    );

  }
}

export default RestaurantListPage;
