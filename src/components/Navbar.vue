<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">GRADEBOOKS</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">

        <!-- MENU -->
        <li v-for="(menuItem, index) in menuItems" :key="menuItem.to + index" class="nav-item">
          <router-link class="nav-link" :to="`/${menuItem.to}`" >
            {{ menuItem.displayForUser }}
          </router-link>
        </li>

        <!-- LOGOUT -->
        <li v-if="isLoggedIn" class="nav-item">
          <a @click="logout" class="nav-link" >Logout</a>
        </li>


      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>


<script>
import { authService } from '../service/authService';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Navbar",
  data() {
    return {
      loggedOutMenu: [
        {
          to: 'login',
          displayForUser: 'Login'
        },
        {
          to: 'register',
          displayForUser: 'Register'
        }
      ],
      loggedInMenu: [
        {
          to: 'professors',
          displayForUser: 'All professors'
        },
        {
          to: 'my-gradebook',
          displayForUser: 'My gradebook'
        },
        {
          to: 'gradebooks/create',
          displayForUser: 'Add gradebook'
        },
        {
          to: 'professors/create',
          displayForUser: 'Add professor'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),//this can be true or false

    
    menuItems() {
      let result = this.loggedOutMenu;
      if(this.isLoggedIn) {
        result = this.loggedInMenu;
      }
      return result;
    }
  },
  methods: {
    ...mapActions(['setLoggedOut']),
    logout(){
      authService.logout();
      this.setLoggedOut();
      this.$router.push('/login');
    }
  }
  
}
</script>