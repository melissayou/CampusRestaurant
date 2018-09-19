import React from 'react';
import resAccessor from '../accessor/resAccessor.js';
import PropTypes from 'prop-types';
import RestaurantListPage from './RestaurantListPage.js';

var wordStyle = {
  color: 'yellow',
  fontSize: '40px',
  textAlign: 'center'
};

//for a restaurant with all info
class RestaurantPage extends React.Component {
  render() {
    return (
      <div>
        <p style={wordStyle}>The following restaurants match your search</p>
        <RestaurantListPage listProp={this.props.resInfoProp.data} isDisplayOffering={false}/>
      </div>
    )
  }
}

export default RestaurantPage;
