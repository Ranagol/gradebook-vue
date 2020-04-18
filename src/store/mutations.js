export default {
 
  setLoggedIn(state){//activated from Login or Register
    state.isLoggedIn = true;
  },

  setLoggedOut(state){//activated from Logout
    state.isLoggedIn = false;
  }

}
