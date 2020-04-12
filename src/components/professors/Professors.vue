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
  created(){
    this.getAllProfessors();
  }

}
</script>