import axios from 'axios';

export default class BaseService {
  constructor() {//this is a must. This will set up automatically the token into the request header.
    axios.defaults.baseURL = 'http://localhost:8000/api/';
    this.axios = axios;
  
    this.setAxiosDefaultAuthorizationHeader();//set the token in the header of our requests
  }
  
  setAxiosDefaultAuthorizationHeader() {
    const TOKEN = window.localStorage.getItem('loginToken');//take the token from local storage
    if (!TOKEN) {//if there is no token
      return;//...just return, without token. No token = user not authorized = can't use this Vue
    }
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;//here we put the received token from Laravel into our request header
  }
}

export const HTTP = new BaseService().axios;
