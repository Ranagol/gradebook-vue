import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Gradebooks from './components/gradebooks/Gradebooks';
import Professors from './components/professors/Professors';

export const routes = [
  { path: '*', redirect:'/login'},
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/gradebooks', name: 'gradebooks', component: Gradebooks },
  { path: '/professors', name: 'professors', component: Professors },
];