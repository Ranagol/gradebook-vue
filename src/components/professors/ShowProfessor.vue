<template>
  <div>
    <p>ShowProfessor</p>
    <div class="jumbotron">
      <h5 class="display-4">Professor: {{ professor.first_name }} {{ professor.last_name }}</h5>

      <!-- Prikazivanje dnevnika -->
      <div v-if="professor.gradebook !== undefined && professor.gradebook.name !==null">
        <p class="lead">Ime dnevnika: <router-link :to="`/gradebooks/${professor.gradebook.id}`" class="link">{{ professor.gradebook.name }}</router-link> </p>
        <!-- TODO - Losi: azok a professorok, akiknek nincs gradbook, nem jelennek meg a ShowProfessor oldalon. Akinek van gradebookja, ott minden OK. -->
      </div>
      <div v-else>
        <!-- Ez a funkcio nem biztos hogy dolgozik. Losi javitas utan majd le kell ellenorizni. -->
        <p>This professor does not have a gradebook yet.</p>
      </div>
      
      
      
      <hr class="my-4">

      <!-- Prikazivanje broja ucenika -->
      <div v-if="professor.gradebook.students !== undefined && professor.gradebook.students.length !==0">
        <p>Broj ucenika: {{ professor.gradebook.students.length }}</p>
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
    }
  },
  
  async created(){
    this.professor = await professorService.getProfessorById(this.$route.params.id);
  }
  
}
</script>