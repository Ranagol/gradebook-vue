<template>
  <form @submit.prevent="register">
    <h3>Register</h3>

    <!-- LSOI ORIGINAL REGISTER DATA DISPLAYING -->
    <!-- <div v-if="errors" class="alert alert-danger">
      {{ errors }}
    </div> -->

    {{ validationErrors }}
    <!-- VALIDATION ERRORS-->
    <div class="alert alert-danger" v-for="(validationError, fieldName) in validationErrors" :key="`validation-errors-${fieldName}`">
      {{ `${fieldName}: ${validationError[0]}` }}
      <!-- //TODO - LOSI registering validation error display not working fully something is wrong with the iteration. This cant work with string as with login. Also, should not the login have a an email is reqired tyoe of validation error, and not just "invalid credentials?" -->
    </div>



    <div class="form-group">
      <label for="first_name">First name</label>
      <input v-model="first_name" type="text" name="first_name" class="form-control" id="first_name">
    </div>

    <div class="form-group">
      <label for="last_name">Last name</label>
      <input v-model="last_name"  type="text" name="last_name"  class="form-control" id="last_name">
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input v-model="email"  type="email"  name="email"  class="form-control" id="email">
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password"  type="password" name="password"  class="form-control" id="password">
    </div>

    <div class="form-group">
      <label for="password_confirmation">Password confirmation</label>
      <input v-model="password_confirmation"  type="password_confirmation"  name="password_confirmation"  class="form-control" id="password_confirmation">
    </div>


    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="terms" required>
      <label class="form-check-label"  name="terms"  for="terms">Accepted terms and conditions</label>
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary">Register</button>
    </div>

  </form>
</template>

<script>
import { authService } from '../../service/authService';
export default {
  name: 'Register',
  data(){
    return{
      first_name:'',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      validationErrors: '',
    }
  },
  methods: {
    //OLD REGISTER FULLY WORKING
    /*
    async register(){
      try {
        await authService.register(this.first_name, this.last_name, this.email, this.password, this.password_confirmation);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
    */
    //NEW REGISTER
    register(){
   
      authService.register(this.first_name, this.last_name, this.email, this.password, this.password_confirmation)
      .then(() => {
        this.$router.push('/');
      })
      .catch((error) => {
        console.dir(error);
        if (error.response && error.response.status === 400) {
          console.log('THIS IS THE ERROR FROM REGISTER PAGE CATCH');
          this.validationErrors = error.response.data;
        } else {
          console.dir(error);
        }
      });
    }
  }
}
</script>