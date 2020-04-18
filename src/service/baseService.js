import axios from 'axios';

export default class BaseService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8000/api/';
    this.axios = axios;
    this.setAxiosDefaultAuthorizationHeader();
  }
  
  setAxiosDefaultAuthorizationHeader() {
    const TOKEN = window.localStorage.getItem('loginToken');
    if (!TOKEN) {
      return;
    }
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  }
}

export const HTTP = new BaseService().axios;
