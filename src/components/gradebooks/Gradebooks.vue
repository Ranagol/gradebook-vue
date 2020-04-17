<template>
  <div>
    <h3>Gradebooks</h3>

    <!-- If there is no data in the db... -->
    <div v-if="!gradebooks.length" class="alert alert-info">
      <h5>There is no data.</h5>
    </div>

    <!-- Loading displaying -->
    <h3 v-if="loading" class="alert alert-warning">
      Loading...
    </h3>

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
  data(){
    return {
      loading: false,
    }
  },
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
    
   
   
    console.log('beforeRouteEnter data fetching activated.');
    next(vm => {//TODO itt created hookra cserelni mindezt
      vm.loading = true;
      vm.getAllGradebooks()//beforeRouteEnter has no accces to this
      console.log('beforeRouteEnter has finished its job, gradebooks are here.');
      vm.loading = false;
    })
  }
}
</script>