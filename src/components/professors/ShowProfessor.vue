<template>
  <div>
    <p>ShowProfessor</p>
    <p>Sidenote: ShowProfessor is gettind his data directly from service-axios-vuex-getter. It is slow, and currently it is remebering the latest professor, untill the new professor have not arrived.</p>
    <div class="jumbotron">
      <h5 class="display-6">Professor: {{ professor.first_name }} {{ professor.last_name }}</h5>
      <p class="lead">Ime dnevnika: <router-link :to="`/gradebooks/${professor.gradebook.id}`" class="link">{{ professor.gradebook.name }}</router-link> </p>
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
    this.getProfessor(this.$route.params.id);//TODO LOSI - check if this is the right way. Is there a better way? De mi a faszomert mukodik ez, mikor a Showprofessor, ami ugyanígy van csinálva, nem mukoid... Maskep: ezt hogyan kell megoldani, honnét húzzam az id számot??
  }
  
}
</script>