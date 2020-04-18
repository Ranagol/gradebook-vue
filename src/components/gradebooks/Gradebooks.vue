<template>
  <div>

    <div class="d-flex flex-row justify-content-between">
      <h3>Gradebooks</h3>

      <app-paginator ref="paginator" :disable="loading" @change-page="changePage" />

      <!-- SEARCH FIELD -->
      <!-- TODO LOSI ---SEARCH NEM DOLGOZIK. Itt a filter es a paginacio egyutt kellene hogy dolgozzon, azaz a kereses eredmenyei is kellene hogy paginalodjanak.  -->
      <!--TODO gradebooks sorrendet megforditani -->
      <form @submit.prevent="searchProfessors" class="form-inline my-2 my-lg-0">
        <input v-model="searchTerm" name="searchTerm" class="form-control" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>

    <!-- If there is no data in the db... -->
    <div v-if="!gradebooks.length" class="alert alert-info">
      <h5>There is no data.</h5>
    </div>

    <!-- Loading displaying -->
    <h3 v-if="loading" class="alert alert-warning">
      Loading...
    </h3>

    <!-- CardGradebook.vue -->
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
import Paginator from '../Paginator';
export default {
  name: 'Gradebooks',
  data(){
    return {
      loading: false,
      gradebooks: [],
      searchTerm:'',
      page: 1
    }
  },
  components: {
    'app-cardgradebook': CardGradebook,
    'app-paginator': Paginator
  },
  
  
  created(){
    this.getAllGradebooks();
  },
  watch: {
    gradebooks: function(newVal) {
      if (newVal.length === 0) {
        this.$refs.paginator.$setLastPage(this.page - 1);
      }
    }
  },
  methods: {
    async getAllGradebooks() {
      try {
        this.loading = true;
        this.gradebooks = await gradebookService.getAllGradebooks(this.searchTerm, this.page);
        this.loading = false;
      } catch (error) {
        console.dir(error);
      }
    },
    changePage(page) {
      this.page = page;
      this.getAllGradebooks();
    }
  }
}
</script>