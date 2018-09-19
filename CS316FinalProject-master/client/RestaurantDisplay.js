import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import resAccessor from '../accessor/resAccessor.js';
import userAccessor from '../accessor/userAccessor.js';
import offeringAccessor from '../accessor/offeringAccessor.js';

var offeringStyle = {
  fontFamily: 'Cochin',
  color: 'darkslateblue',
  fontSize: '20px',
  position: 'relative',
  left: '400px',
  fontWeight: 'bold',
};
var titleStyle = {
  color: 'indigo',

  fontSize: '40px',
  position: 'relative',
  left: '50px'
};

var emptyStyle = {
  width: '100px',
  height: '800px'
};

var buttonStyle = {
  width: '200px',
  height: '30px',
  position: 'relative',
  left: '300px'
};




class RestaurantDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      isAdding: false,
      addedOfferings: [],
      error: null,
    };
    this.toggleAdd = this.toggleAdd.bind(this);
    this.addNewInput = this.addNewInput.bind(this);
    this.onUpdateAddedOfferName = this.onUpdateAddedOfferName.bind(this);
    this.onUpdateAddedOfferPrice = this.onUpdateAddedOfferPrice.bind(this);
    this.submitAddedOfferings = this.submitAddedOfferings.bind(this);
    this.submitUpdatedOffering = this.submitUpdatedOffering.bind(this);
    this.deleteOffering = this.deleteOffering.bind(this);
  }

  async getRestaurant() {
    let response = await resAccessor.getRestaurantById(this.props.resIdProp);
    if (response.status === 'success') {
      this.setState({restaurant: response.data, isAdding: false});
    } else {
      this.setState({error: response.error})
    }
  }

  componentDidMount() {
    this.getRestaurant();
  }

  toggleAdd() {
    this.setState({
      isAdding: !this.state.isAdding,
      addedOfferings: this.state.isAdding ? [] : [{
        offering_name: "",
        offering_price:"",
      }]
    });
  }

  addNewInput() {
    let addedOfferings = this.state.addedOfferings;
    addedOfferings.push({
      offering_name: '',
      offering_price: '',
    });
    this.setState({addedOfferings});
  }

  async submitAddedOfferings() {
    for (let i = 0; i < this.state.addedOfferings.length; i++) {
      let o = this.state.addedOfferings[i];
      if (o.offering_name == '' || isNaN(o.offering_price)) {
        return;
      }
    }
    let res = await offeringAccessor.addOfferings({
      restaurant_id: this.props.resIdProp,
      offerings: this.state.addedOfferings,
    });
    if (res.status === 'success') {
      this.getRestaurant();
    } else {
      console.error(res.error);
    }
  }

  async submitUpdatedOffering(id, content) {
    if (
      id == null || content.offering_name == '' || isNaN(content.offering_price)
    ) {
      return;
    }
    let res =
      await offeringAccessor.updateOffering(id, content);
    if (res.status === 'success') {
      this.getRestaurant();
    } else {
      console.error(res.error);
    }
  }

  async deleteOffering(id) {
    if (id == null) return;
    let res = await offeringAccessor.deleteOffering(id);
    if (res.status === 'success') {
      this.getRestaurant();
    } else {
      console.error(res.error);
    }
  }

  onUpdateAddedOfferName(name, index) {
    let addedOfferings = this.state.addedOfferings;
    addedOfferings[index].offering_name = name;
    this.setState({addedOfferings});
  }

  onUpdateAddedOfferPrice(price, index) {
    let addedOfferings = this.state.addedOfferings;
    addedOfferings[index].offering_price = price;
    this.setState({addedOfferings});
  }

  render() {
    const offeringInputRow = (offer, index) => (
      <div key={index}>
        <input
          type="text"
          name="added_offering_name"
          placeholder={'Enter Food Name'}
          required
          value={offer.offering_name}
          onChange={
            (event) => this.onUpdateAddedOfferName(event.target.value, index)
          }
        />
        <span>{' $'}</span>
        <input
          type="number"
          min="0"
          max="2147483647"
          name="added_offering_price"
          placeholder={'Enter Unit Price'}
          required
          value={offer.offering_price}
          onChange={
            (event) => this.onUpdateAddedOfferPrice(event.target.value, index)
          }
        />
      </div>
    );
    if (this.state.restaurant) {
      let res = this.state.restaurant;
      return (
        <div>
          <div className="resGeneralInfo" style={titleStyle}>
          {res.name},
          {res.location},
          {res.origin},
          {res.time}
          </div>
          <br></br>
          <div className="allOfferings" style={offeringStyle}>{
            res.offering.map((offer, index) =>
              <TableRow
                key={index}
                authorized={this.props.authProp}
                tableRowProp={offer}
                submitUpdateProp={this.submitUpdatedOffering}
                deleteOfferingProp={this.deleteOffering}
              />
            )
          }</div>
          <br></br>
          <br></br>
          {!this.props.authProp ? null : (
            <div>
              <button onClick={this.toggleAdd} style={buttonStyle}>
                {this.state.isAdding ? 'Cancel' : 'Add Offerings'}
              </button>
              <br></br>
              <br></br>
              <br></br>

              {!this.state.isAdding ? null : (
                  <div>
                    <div>
                      {this.state.addedOfferings.map(offeringInputRow)}
                    </div>
                    <div>
                      <button onClick={this.addNewInput}>+</button>
                      <button onClick={this.submitAddedOfferings}>Submit</button>
                    </div>
                  </div>
              )}
            </div>
          )}
        </div>
      )
    } else if (this.state.error) {
      return <div> this.state.error </div>
    }
    return <div>Loading</div>;
  }

}


class TableRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: '',
      price: '',
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onUpdateName = this.onUpdateName.bind(this);
    this.onUpdatePrice = this.onUpdatePrice.bind(this);
    this.submit = this.submit.bind(this);
    this.remove = this.remove.bind(this);
  }

  toggleEdit() {
    let offerProp = this.props.tableRowProp;
    this.setState({
      isEditing: !this.state.isEditing,
      name: this.state.isEditing ? '' : offerProp.offering_name,
      price: this.state.isEditing ? '' : offerProp.offering_price,
    });
  }

  onUpdateName(event) {
    this.setState({name: event.target.value});
  }

  onUpdatePrice(event) {
    this.setState({price: event.target.value});
  }

  submit() {
    const content = {
      offering_name: this.state.name,
      offering_price: this.state.price,
    };
    this.props.submitUpdateProp(this.props.tableRowProp.offering_id, content);
    this.toggleEdit();
  }

  remove() {
    this.props.deleteOfferingProp(this.props.tableRowProp.offering_id);
  }

  render () {
    let loginInfo=this.props.authorized;
    return (

      <div className="Offering_details">
       <br></br>
        {!this.state.isEditing
          ? (<div>
              <span>{this.props.tableRowProp.offering_name},</span>
              <span>{' $' + this.props.tableRowProp.offering_price}</span>
            </div>)
          : (<div>
              <input
                type="text"
                name="edit_offering_name"
                placeholder={'Enter Food Name'}
                required
                value={this.state.name}
                onChange={this.onUpdateName}
              />
              <span>{' $'}</span>
              <input
                type="number"
                min="0"
                max="2147483647"
                name="edit_offering_price"
                placeholder={'Enter Unit Price'}
                required
                value={this.state.price}
                onChange={this.onUpdatePrice}
              />
            </div>)
        }
        {!loginInfo? null: (
          <div>
             <br></br>
            <button onClick={this.toggleEdit}>
              {this.state.isEditing ? 'Cancel' : 'Edit'}
            </button>
            {this.state.isEditing
              ? (
                <button onClick={this.submit}>
                  Save
                </button>
              )
              : (
                <button onClick={this.remove}>
                  Delete
                </button>
              )
            }

          </div>
        )}
      </div>
    );
  }
}

export default RestaurantDisplay;
