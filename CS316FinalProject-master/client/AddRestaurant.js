import React from 'react';
import PropTypes from 'prop-types';
import resAccessor from '../accessor/resAccessor.js';
import { Route, Redirect } from 'react-router-dom';


class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      location:'',
      origin:'',
      time:'',
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateOrigin = this.updateOrigin.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  async handleSubmit() {
    let response = await resAccessor.createRestaurant(
      {name: this.state.name,
       location: this.state.location,
       origin: this.state.origin,
       time: this.state.time,
      }
    );
    if (response.status === 'success') {
      let id = response.data.id;
      this.props.onAddResIdChangeProp(id);
    } else {
      this.setState({error: response.error})
    }
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

  render () {
    return (
      <div> Please enter the following restaurant information
        <div>Name:
          <input type="text" name="Name" required value={this.state.name} onChange={this.updateName}/>
        </div>

        <div>Location:
          <input type="text" name="Location" required value={this.state.location} onChange={this.updateLocation}/>
        </div>

        <div>Origin:
          <input type="text" name="Origin" required value={this.state.origin} onChange={this.updateOrigin}/>
        </div>

        <div>Time:
          <input type="text" name="Time" required value={this.state.time} onChange={this.updateTime}/>
        </div>

        <button onClick={this.handleSubmit}>
        Submit
        </button>
      </div>
    )
  }
}

export default AddRestaurant;
