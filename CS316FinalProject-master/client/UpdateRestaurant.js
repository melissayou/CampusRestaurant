import React from 'react';
import PropTypes from 'prop-types';
import resAccessor from '../accessor/resAccessor.js';
import { Route, Redirect } from 'react-router-dom';


class UpdateRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'loading...',
      location:'loading...',
      origin:'loading...',
      time:'loading...',
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateOrigin = this.updateOrigin.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.getDefaultRestaurant = this.getDefaultRestaurant.bind(this);
  }

  async getDefaultRestaurant() {
    let response = await resAccessor.getRestaurantById(this.props.resIdProp);
    if (response.status === 'success') {
      this.setState({
        name: response.data.name,
        location: response.data.location,
        origin: response.data.origin,
        time: response.data.time
      });
    } else {
      this.setState({error: response.error})
    }
  }

  componentDidMount() {
    this.getDefaultRestaurant();
  }

  updateName(event) {
    this.setState({name: event.target.value});
  }

  updateLocation(event) {
    this.setState({location: event.target.value});
  }
  updateOrigin(event) {
    this.setState({origin: event.target.value});
  }
  updateTime(event) {
    this.setState({time: event.target.value});
  }

  async handleSubmit() {
    let response = await resAccessor.updateRestaurant(this.props.resIdProp,{
       name: this.state.name,
       location: this.state.location,
       origin: this.state.origin,
       time: this.state.time,
    });
    if (response.status === 'success') {
      this.props.onUpdateResIdChangeProp(this.props.resIdProp);
    } else {
      this.setState({error: response.error})
    }
  }

  render () {
    return (
      <div> Please modify the following restaurant information
        <div>Name:
          <input type="text" name="Name" placeholder={this.state.name} required value={this.state.name} onChange={this.updateName}/>
        </div>

        <div>Location:
          <input type="text" name="Location" placeholder={this.state.location} required value={this.state.location} onChange={this.updateLocation}/>
        </div>

        <div>Origin:
          <input type="text" name="Origin" placeholder={this.state.origin} required value={this.state.origin} onChange={this.updateOrigin}/>
        </div>

        <div>Time:
          <input type="text" name="Time"  placeholder={this.state.time} required value={this.state.time} onChange={this.updateTime}/>
        </div>

        <button onClick={this.handleSubmit}>
        Update
        </button>
      </div>
    )
  }
}

export default UpdateRestaurant;
