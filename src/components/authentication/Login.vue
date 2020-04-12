<template>
  <form @submit.prevent="login">
    <h3>Login</h3>
    <div class="form-group">
      <label for="email">Email</label>
      <input v-model="email" type="email" class="form-control" id="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password" type="password" class="form-control" id="password">
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<script>
import { authService } from '../../service/authService';
export default {
  name: 'Login',
  data(){
    return {
      email: '',
      password: '',
    }
  },
  methods:{
    login(){
      console.log(this.email, this.password);
      authService.login(this.email, this.password).then(()=>{
        this.$router.push('/');
      }).catch(() => alert('invalid credentials given during login process'));
    }
  }
}
</script>

