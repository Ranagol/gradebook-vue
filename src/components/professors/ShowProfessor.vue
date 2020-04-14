<template>
  <div>
    <p>ShowProfessor</p>
    <div class="jumbotron">
      <h5 class="display-6">Professor: {{ professor.first_name }} {{ professor.last_name }}</h5>
      <p class="lead">Ime dnevnika: <router-link :to="`/gradebooks/${professor.gradebook.id}`" class="link">{{ professor.gradebook.name }}</router-link> </p>
      <hr class="my-4">
      <p>Broj ucenika: {{ professor.gradebook.students.length }}</p>
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
    }
  },
  
  async created(){
    this.professor = await professorService.getProfessorById(this.$route.params.id);
  }
  
}
</script>