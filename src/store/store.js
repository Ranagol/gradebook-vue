import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  
  getters,
  state: {
    gradebooks: [],//ezt alighanem ki lehet torolni
    //gradebook: {},
    professors: [],
    //professor: {},//ezt alighanem ki lehet torolni, es ha igen, akkor torolni mindent actions, mutations, getters
    isLoggedIn: false,
    
  },
  mutations,
  actions,
});
