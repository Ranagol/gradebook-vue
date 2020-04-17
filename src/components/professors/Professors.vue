<template>
  <div>
    <p>Professors</p>

    <!-- If there is no data in the db... -->
    <div v-if="!professors.length" class="alert alert-info">
      <h5>There is no data.</h5>
    </div>

    <!-- Loading displaying -->
    <h3 v-if="loading" class="alert alert-warning">
      Loading...
    </h3>

    <div class="d-flex flex-row flex-wrap">
      <app-card-professor v-for="professor in professors" :key="professor.id" :professor='professor'></app-card-professor>
    </div>
    
  </div>
</template>


<script>
import CardProfessor from './CardProfessor';
import professorService from '../../service/professorService';
export default {
  name: 'Professors',
  data(){
    return {
      loading: false,
      professors: [],
    }
  },
  
  components: {
    'app-card-professor': CardProfessor,
  },
  async created(){
    try {
      this.loading = true;
      this.professors = await professorService.getAllProfessors();
      this.loading = false;
    } catch (error) {
      console.log('Error from professorSErvice/getAllProfessors');
    }
    
  }

  

}
</script>