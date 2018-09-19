import queryString from 'query-string';
import userAccessor from './userAccessor.js';
//let ROOT_URL = 'http://localhost:3000/api/offering';
let ROOT_URL = 'https://dukefood.herokuapp.com/api/offering';


const offeringAccessor = {
  /**
   * GET /api/offering?name=xxxx
   * Get the offering by its name
   * @param  {Object}  name {name: offering_name}
   */
  async searchByOfferingName(query) {
    let offeringurl = ROOT_URL + `?${queryString.stringify(query)}`;
    const response = await fetch(offeringurl, {
      method: 'GET',
    });
    const responseJson = await response.json();
    console.log('searchByOfferingNameByName:', responseJson);
    return responseJson;
  },

  async addOfferings(content) {
    const addOfferingsUrl = ROOT_URL;
    const body = content;
    const response = await fetch(addOfferingsUrl, {
      method: 'POST',
      headers: userAccessor.getAuthHeader(),
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    console.log('addOfferings Response:', responseJson);
    return responseJson;
  },

  async updateOffering(id, content) {
    const updateOfferingUrl = ROOT_URL + '/' + id;
    const body = content;
    const response = await fetch(updateOfferingUrl, {
      method: 'PUT',
      headers: userAccessor.getAuthHeader(),
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    console.log('updateOffering Response:', responseJson);
    return responseJson;
  },

  async deleteOffering(id) {
    const deleteOfferingUrl = ROOT_URL + '/' + id;
    const response = await fetch(deleteOfferingUrl, {
      method: 'DELETE',
      headers: userAccessor.getAuthHeader(),
    });
    const responseJson = await response.json();
    console.log('deleteOffering Response:', responseJson);
    return responseJson;
  }

}
export default offeringAccessor;
