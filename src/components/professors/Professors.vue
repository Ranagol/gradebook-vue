<template>
  <div>
    <p>Professors</p>
    <div class="d-flex flex-row flex-wrap">
      <app-card-professor v-for="professor in professors" :key="professor.id" :professor='professor'></app-card-professor>
    </div>
    
  </div>
</template>


<script>
import CardProfessor from './CardProfessor';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Professors',

  computed: {
    ...mapGetters(['professors']),
  },
  methods: {
    ...mapActions(['getAllProfessors']),
  },
  components: {
    'app-card-professor': CardProfessor,
  },
  beforeRouteEnter(to, from, next){//here we use beforeRouteEnter to trigger, start the movie-getting-process
    console.log(`beforeRouteEnter data fetching activated. From: ${from.path} to: ${to.path}`);
    next(vm => {
      vm.getAllProfessors()//beforeRouteEnter has no accces to this
      console.log('beforeRouteEnter has finished its job, professors are here.');
    })
  },

  /*
  created(){
    this.getAllProfessors();
  }
  */

}
</script>