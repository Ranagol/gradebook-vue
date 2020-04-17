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
import gradebookService from '../../service/gradebookService';
import CardGradebook from './CardGradebook';
export default {
  name: 'Gradebooks',
  data(){
    return {
      loading: false,
      gradebooks: [],
    }
  },
  components: {
    'app-cardgradebook': CardGradebook,
  },
  
  
  async created(){
    try {
      this.loading = true;
      this.gradebooks = await gradebookService.getAllGradebooks();
      this.loading = false;
    } catch (error) {
      console.log('Error from gradebookSErvice/getAllGradebooks');
    }
    
  }
}
</script>