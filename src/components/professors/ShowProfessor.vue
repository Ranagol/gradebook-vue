<template>
  <div>
    <p>ShowProfessor</p>
    <div class="jumbotron">
      <h5 class="display-6">Professor: {{ professor.first_name }} {{ professor.last_name }}</h5>
      <p class="lead">Ime dnevnika: {{ professor.gradebook.name }}</p>
      <hr class="my-4">
      <p>Broj ucenika: {{ professor.gradebook.students.length }}</p>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ShowProfessor',
  computed: {
    ...mapGetters(['professor']),
  },
  methods: {
    ...mapActions(['getProfessor']),
  },
  created(){
    console.log(this.$route.params.id)
    this.getProfessor(this.$route.params.id);
  }
  
}
</script>