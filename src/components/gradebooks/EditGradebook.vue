<template>
  <div>
    {{ gradebook }}
    <app-add-gradebook></app-add-gradebook>
    <app-add-student></app-add-student>
  </div>
</template>

<script>
import AddGradebook from './AddGradebook';
import AddStudent from '../students/AddStudent';
import gradebookService from '../../service/gradebookService';
export default {
  name: 'EditGradebook',
  components: {
    'app-add-gradebook': AddGradebook,
    'app-add-student': AddStudent,
  },
  data(){
    return {
      goBackHere:'',
      gradebook: {},//TODO LOSI -EZT UTOLJARA HAGYNI elolvastatni a Losival a feladatot, megkérezni, hogy ő ezt hogyan értelmezi, mit is kellene csinalni. És persze: hogyan. Lépésről lépésre.
      gradebookId: this.$route.params.id || 0,
    }
  },
  methods: {
    onSubmit(){
      
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.goBackHere = from.path;
    })
  },
  async created(){
    console.dir(this.$route.path);
    if (this.goBackHere == '/my-gradebook') {
      this.gradebook = await gradebookService.getMyGradebook();
      this.gradebookId = this.gradebook.id;
    } else {
      this.gradebook = await gradebookService.getGradebookById(this.gradebookId);
    }
    console.dir(this.gradebook);
  }

}
</script>