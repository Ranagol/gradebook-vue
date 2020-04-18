<template>
  <div>
    <p>ShowProfessor</p>

    <!-- Loading displaying -->
    <h3 v-if="loading" class="alert alert-warning">
      Loading...
    </h3>

    <div class="jumbotron">
      <h5 class="display-4">Professor: {{ professor.first_name }} {{ professor.last_name }}</h5>

      <!-- Prikazivanje dnevnika -->
      <div v-if="professor.gradebook !== null">
        <p class="lead">Ime dnevnika: <router-link :to="`/gradebooks/${gradebook.id}`" class="link">{{ gradebook.name }}</router-link> </p>
      </div>
      <div v-else>
        <p>This professor does not have a gradebook yet.</p>
      </div>
      <hr class="my-4">

      <!-- Prikazivanje broja ucenika -->
      <div v-if="gradebook.students !== undefined && gradebook.students.length !==0">
        <p>Broj ucenika: {{ gradebook.students.length }}</p>
      </div>
      <div v-else>
        <p>Ovaj dnevnik trenutno nema studente.</p>
      </div>
      
    </div>
  </div>
</template>


<script>
import professorService from '../../service/professorService';
export default {
  name: 'ShowProfessor',
  data(){
    return {
      professor: {},
      loading: false,
    }
  },
  computed: {
    gradebook() {
      return this.professor.gradebook || {};
    }
  },
  
  async created(){
    this.loading = true;
    this.professor = await professorService.getProfessorById(this.$route.params.id);
    this.loading = false;
  }
}
</script>