<template>
  <div>
    <p>ShowGradebook</p>
    <p>Sidenote: ShowGradebook is getting his data from axios, but it is not using the vuex. No need for vuex.</p>
    <div class="jumbotron">
      <h3 class="display-6">Gradebook: {{ gradebook.name }}</h3>
      <p class="lead">Professor: <router-link :to="`/professors/${gradebook.professor.id}`" class="link">{{ gradebook.professor.first_name }} {{gradebook.professor.last_name }}</router-link></p>
      <hr class="my-4">
      <p>Student list:</p>
      <ol>
        <li v-for="student in gradebook.students" :key="student.id">{{ student.first_name }} {{ student.last_name }}</li>
      </ol>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['gradebook']),
  },
  methods: {
    ...mapActions(['getGradebook']),
  },
  created(){
    this.getGradebook(this.$route.params.id);//TODO LOSI - check if this is the right way. Is there a better way?
    //TODO LOSI ---- kurvA FASZOMERT NEM AKAR EZ MUKODNI?????????????
  }
  


}
</script>