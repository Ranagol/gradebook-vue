import BaseService from './baseService';

export default class AuthService extends BaseService {

  /* OLD REGISTER, FULLY FUNCTIONALY
  register(first_name, last_name, email, password, password_confirmation){
    return this.axios.post('register', { first_name, last_name, email, password, password_confirmation})
    .then(response => {
      console.log(response, 'response');//ovde uhvatimo response, dobijamo token posle register
      window.localStorage.setItem('loginToken', response.data.token);
      this.setAxiosDefaultAuthorizationHeader();
    }).catch(() => alert('invalid credentials by vanja'));//ako ima neki problem, catch se aktivira, pa odradimo alert
  }
  */

  //new register copied from losi login
  register(first_name, last_name, email, password, password_confirmation){
    return new Promise((resolve, reject) => {
      this.axios.post('register', { first_name, last_name, email, password, password_confirmation})
      .then((response) => {
        console.log(response, 'response');//ovde uhvatimo response, dobijamo token posle register
        window.localStorage.setItem('loginToken', response.data.token);
        window.localStorage.setItem('user_id', response.data.userId);
        this.setAxiosDefaultAuthorizationHeader();
        resolve(response.data.token);//this is sent to try on the calling functions
      }).
      catch((error) => {
        console.log('Error from register authService', error.response.data);
        reject(error);
      })
    });
  }
   
  
  login(email, password) {
    return new Promise((resolve, reject) => {
      this.axios.post('login', { email, password })
        .then((response) => {
          console.log(response.data.token);
          window.localStorage.setItem('user_id', response.data.userId);
          window.localStorage.setItem('loginToken', response.data.token);
          this.setAxiosDefaultAuthorizationHeader();
          resolve(response.data.token);
        }).
        catch ((error) => {
          console.log('Error from login authService', error.response.data.error);
          reject(error);
        })
    });
  }
  


  logout() {
    window.localStorage.removeItem('loginToken');
    window.localStorage.removeItem('user_id');
    delete this.axios.defaults.headers.common['Authorization'];
  }

  isAuthenticated() {
    return !!window.localStorage.getItem('loginToken');
  }}
export const authService = new AuthService();

