<template>
  <div>
    <div class="d-flex flex-row justify-content-between">
      <h3>Professors</h3>

      <!-- TODO LOSI sorrend descending -->
      <!-- SEARCH FIELD -->
      <form @submit.prevent="searchProfessors" class="form-inline my-2 my-lg-0">
        <input v-model="searchTerm" name="searchTerm" class="form-control" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>

    <!-- If there is no data in the db... -->
    <div v-if="!professors.length" class="alert alert-info">
      <h5>There is no data.</h5>
    </div>

    <!-- Loading displaying -->
    <h3 v-if="loading" class="alert alert-warning">
      Loading...
    </h3>

    <!-- Professors iteration -->
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
  components: {
    'app-card-professor': CardProfessor,
    
  },
  data(){
    return {
      loading: false,
      professors: [],
      searchTerm: '',
    }
  },
  methods: {
    async getProfessors() {
      try {
        this.loading = true;
        this.professors = await professorService.getAllProfessors(this.searchTerm);
        this.loading = false;
      } catch (error) {
        console.dir(error);
      }
    },
    searchProfessors(){
      this.getProfessors();
    },
  },
  
  created(){
    this.getProfessors();
  }
}
</script>