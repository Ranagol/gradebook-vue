import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const isThereToken = localStorage.getItem('loginToken');//check if the user has a login token
  console.log(`Guard activated. From: ${from.path} to: ${to.path}`)//awesome consol.log trick to see if this is working

  if ((to.name !== 'login' && to.name !== 'register') && !isThereToken) {//if the user is not logged in, he can only visit the login and the register page. ATTENTION: these here are route NAMES, NOT ROUTE PATHS!

    next('/login');
    return;

  } else if ((to.name === 'login' || to.name === 'register') && isThereToken ) {//if the user is logged in, he can't visit login and register pages, if he does that, navigate him to the /gradebooks
  
    return next('/')

  } else next();
  
});






Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
