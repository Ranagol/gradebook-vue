<template>
  <div>
    <h3>Gradebooks</h3>
    <div class="d-flex flex-row flex-wrap">
      <app-cardgradebook
            v-for="gradebook in gradebooks"
            :key="gradebook.id"
            :gradebook="gradebook"
      />
    </div>
    
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import CardGradebook from './CardGradebook';
export default {
  name: 'Gradebooks',
  components: {
    'app-cardgradebook': CardGradebook,
  },
  computed: {
    ...mapGetters(['gradebooks']),
  },
  methods: {
    ...mapActions(['getAllGradebooks']),
  },
  beforeRouteEnter(to, from, next){//here we use beforeRouteEnter to trigger, start the movie-getting-process
    console.log(`beforeRouteEnter data fetching activated. From: ${from.path} to: ${to.path}`);
    next(vm => {
      vm.getAllGradebooks()//beforeRouteEnter has no accces to this
      console.log('beforeRouteEnter has finished its job, gradbooks are here.')
    })
  }
}
</script>