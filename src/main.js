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
  const isThereToken = localStorage.getItem('loginToken');
  if ((to.name !== 'login' && to.name !== 'register') && !isThereToken) {
    next('/login');
    return;
  } else if ((to.name === 'login' || to.name === 'register') && isThereToken ) {
    return next('/')
  } else next();
});

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
