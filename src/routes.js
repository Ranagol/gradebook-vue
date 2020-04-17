import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Gradebooks from './components/gradebooks/Gradebooks';
import ShowGradebook from './components/gradebooks/ShowGradebook';
import AddGradebook from './components/gradebooks/AddGradebook';
import EditGradebook from './components/gradebooks/EditGradebook';

import Professors from './components/professors/Professors';
import AddProfessor from './components/professors/AddProfessor';
import ShowProfessor from './components/professors/ShowProfessor';

import AddStudent from './components/students/AddStudent';
import AddComment from './components/comments/AddComment';

export const routes = [
  //{ path: '*', redirect:'/login'},
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },

  { path: '/', name: 'gradebooks', component: Gradebooks },
  { path: '/my-gradebook', name: 'MyGradebook', component: ShowGradebook },
  { path: '/gradebooks/create', name: 'AddGradebook', component: AddGradebook },//this must be before ShowGradebook!!
  { path: '/gradebooks/:id', name: 'ShowGradebook', component: ShowGradebook },
  { path: '/gradebooks/:id/edit', name: 'EditGradebook', component: EditGradebook },
  

  { path: '/professors', name: 'professors', component: Professors },
  { path: '/professors/create', name: 'AddProfessors', component: AddProfessor },
  { path: '/professors/:id', name: 'ShowProfessor', component: ShowProfessor },

  { path: '/gradebooks/:id/students/create', name: 'AddStudent', component: AddStudent },
  { path: '/gradebooks/:id/comments/create', name: 'AddComment', component: AddComment },

];