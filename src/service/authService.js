import BaseService from './baseService';

export default class AuthService extends BaseService {
  register(first_name, last_name, email, password, password_confirmation){
    return this.axios.post('register', { first_name, last_name, email, password, password_confirmation})
    .then(response => {
      console.log(response, 'response');//ovde uhvatimo response, dobijamo token posle register
      window.localStorage.setItem('loginToken', response.data.token);
      this.setAxiosDefaultAuthorizationHeader();
    }).catch(() => alert('invalid credentials by vanja'));//ako ima neki problem, catch se aktivira, pa odradimo alert
  }
  
  login(email, password) {
    // try {
    //   const response = await this.axios.post('login', { email, password });
    //   console.log(response.data.token);
    //   window.localStorage.setItem('loginToken', response.data.token);
    //   this.setAxiosDefaultAuthorizationHeader();

    // } catch (error) {
    //   console.log('Error from login authService', error.response.data.error);
    // }

    return new Promise((resolve, reject) => {
      this.axios.post('login', { email, password })
        .then((response) => {
          console.log(response.data.token);
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
    //Dokle god user ima token, server ga prepoznaje. Kada zelimo logout, onda treba da obrisemo token iz localstorage, i treba da izbrisemo is axios headera. Sustina je da token saljemo tokom svakog requesta. local storage: ako je token u ls, onda je user loginovan.

    window.localStorage.removeItem('loginToken');
    delete this.axios.defaults.headers.common['Authorization'];
  }

  isAuthenticated() {
    return !!window.localStorage.getItem('loginToken');//!! je nacin da neku string vrednost prebacimo u boolean.
  }}
export const authService = new AuthService();

