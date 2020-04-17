<template>
  <div>
    <app-add-gradebook></app-add-gradebook>
    <app-add-student></app-add-student>

  </div>
</template>

<script>
import AddGradebook from './AddGradebook';
import AddStudent from '../students/AddStudent';
export default {
  name: 'EditGradebook',
  components: {
    'app-add-gradebook': AddGradebook,
    'app-add-student': AddStudent,
  },
  data(){
    return {
      goBackHere:'',
    }
  },
  methods: {
    onSubmit(){
      //after succesfull submit just use this to go back either to my-gradebook or to gradebooks/:id --- this.$router.push(this.goBackHere);
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(`EditGradebook create guard activated. From: ${from.path} to: ${to.path}`);
    next((vm) => {
      vm.goBackHere = from.path;
      console.log('goBackHere value is now: ', vm.goBackHere);
    })
  }

}
</script>