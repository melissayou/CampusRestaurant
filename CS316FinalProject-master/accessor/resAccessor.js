const queryString = require('query-string');
import userAccessor from './userAccessor.js';


if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

//let ROOT_URL = 'http://localhost:3000/api/restaurants';
//let LOGIN_URL = 'http://localhost:3000/api/login';
let ROOT_URL = 'https://dukefood.herokuapp.com/api/restaurants';
let LOGIN_URL = 'http://dukefood.herokuapp.com/api/login';


const resAccessor = {
  /**
   * GET /api/restaurants/:id
   * Get the restaurant by its id
   * @param  {Object}  id {restaurant_id}
   */
  async getRestaurantById(id) {
    let url = `${ROOT_URL}/${id}/`
    const response = await fetch(url, {
      method: 'GET',
    });
    const responseJson = await response.json();
    console.log('getRestaurantById:', responseJson);
    return responseJson;
  },
/**
 * GET /api/restaurants?name=xxxx
 * Get the restaurant by its name
 * @param  {Object}  name
 */
  async getRestaurantByName(nameObject) {
    let url = ROOT_URL;
    url += `?${queryString.stringify(nameObject)}`;
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
    });
    const responseJson = await response.json();
    console.log('getRestaurantByName:', responseJson);
    return responseJson;
  },

  /**
  *GET /api/login?permission_number=xxxx
  *Get the login info; either success or Not
  * @param {Object} pm
  */

  async getLoginInfo(pm){
    let url = LOGIN_URL;
    url+=`?${queryString.stringify(pm)}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    const responseJson = await response.json();
    return responseJson;
  },

/**
 * GET /api/restaurants
 * Get all restaurants
 */
  async getResList() {
    let url = ROOT_URL;
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
    });
    const responseJson = await response.json();
    console.log('getRestaurantAllRestaurants:', responseJson);
    return responseJson;
  },


  /**
   * POST /api/restaurants
   * create a restaurant
   * @param  {Object}  content
   */
  async createRestaurant(content) {
    console.log(content);
    const createRestaurantUrl = ROOT_URL;
    const body = content;
    console.log(body);
    const response = await fetch(createRestaurantUrl, {
      method: 'POST',
      headers: userAccessor.getAuthHeader(),
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    console.log('createRestaurant Response:', responseJson);
    return responseJson;
  },

  /**
   * PUT /api/restaurants/:id
   * @param  {Object}  content new content
   */
  async updateRestaurant(resId, content) {
    console.log(resId);
    const updateRestaurantUrl = `${ROOT_URL}/${resId}/`;
    const body = content;
    const response = await fetch(updateRestaurantUrl, {
      method: 'PUT',
      headers: userAccessor.getAuthHeader(),
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    console.log('updateRestaurant reponse:', responseJson);
    return responseJson;
  },
  /**
   * DELETE /api/restaurants/:id
   * @param  {Number}  id the id of the restaurant being deleted.
   */
  async deleteRestaurant(id) {
    const deleteRestaurantUrl = `${ROOT_URL}/${id}/`;
    const response = await fetch(deleteRestaurantUrl, {
      method: 'DELETE',
      headers: userAccessor.getAuthHeader(),
    });
    const responseJson = await response.json();
    console.log('deleteRestaurant reponse:', responseJson);
    return responseJson;
  },




}

export default resAccessor;
