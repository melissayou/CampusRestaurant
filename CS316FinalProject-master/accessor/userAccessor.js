const userAccessor = {
  getAuthHeader() {
    return {
      //Authorization: `JWT ${this.getToken()}`,
      'Content-Type': 'application/json',
    };
  },
  isLoggedIn() {
    return true
  },
}
export default userAccessor;
