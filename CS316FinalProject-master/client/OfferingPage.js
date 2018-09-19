import React from 'react';
import resAccessor from '../accessor/resAccessor.js';
import offeringAccessor from '../accessor/offeringAccessor.js';
import PropTypes from 'prop-types';
import RestaurantListPage from './RestaurantListPage.js'

var wordStyle = {
  color: 'yellow',
  fontSize: '40px',
  textAlign: 'center'
};

//reslist have this offering
class OfferingPage extends React.Component {
  render() {
    //console.log(this.props.offInfoProp.data);
    //console.log(this.props.offStringProp);
    return (
      <div>
        <p style={wordStyle}>The following restaurant has the dish</p>
        <RestaurantListPage listProp={this.props.offInfoProp.data} isDisplayOffering={true}/>
      </div>
    );
  }
}


export default OfferingPage;
