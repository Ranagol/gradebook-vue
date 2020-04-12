<template>
  <div>
    <h3>Gradebooks</h3>
    <div class="d-flex flex-row flex-wrap">
      <app-cardgradebook v-for="gradebook in gradebooks" :key="gradebook.id" :gradebook='gradebook'></app-cardgradebook>
    </div>
    
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import CardGradebook from './CardGradebook';
export default {
  name: 'Gradebooks',
  computed: {
    ...mapGetters(['gradebooks']),
  },
  methods: {
    ...mapActions(['getAllGradebooks']),
  },
  created(){
    this.getAllGradebooks();
  },
  components: {
    'app-cardgradebook': CardGradebook,
  }
}
</script>