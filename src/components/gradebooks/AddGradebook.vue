<template>
  <div>

    <!-- VALIDATION ERRORS-->
    <div class="alert alert-danger" v-for="(validationError, fieldName) in validationErrors" :key="`validation-errors-${fieldName}`">
      {{ `${fieldName}: ${validationError[0]}` }}
    </div>
    
  <!-- ADD NEW GRADEBOOK NAME -->
  <form @submit.prevent="onSubmit">
    <h3>Add new gradebook:</h3>
    <div class="form-group row">
      <label for="name" class="col-4 col-form-label">Gradebook name</label>
      <div class="col-8">
        <div class="input-group">
          <input
            id="name"
            name="name"
            type="text"
            class="form-control here"
            v-model="name"
          />
        </div>
      </div>
    </div>
    
    
    <!-- SELECT PROFESSOR -->
    <!-- WHEN THERE ARE NO AVAILABLE PROFESSORS -->
    <div v-if="!availableProfessors.length" class="alert alert-info">
      <h5>Currently there are no available professors, that could be assigned to this gradebook.</h5>
    </div>
    <div v-if="availableProfessors.length" class="form-group">
      <label for="professor">Assign this gradebook to a professor:</label>
      <select class="form-control" v-model="professor_id" id="professor">
        <option selected value="">Do not assign</option>
        <option v-for="professor in availableProfessors" :key="professor.id" :value="professor.id">{{ professor.first_name }}</option>
      </select>
    </div> 

    <!-- SUBMIT -->
    <div class="form-group row">
      <div class="offset-4 col-8">
        <button name="submit" type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>    
    
  </form>

  </div>
</template>

<script>
import professorService from '../../service/professorService';
import gradebookService from '../../service/gradebookService';
export default {
  name: 'AddGradebook',
  data(){
    return{
      name:'',
      professor_id:'',
      availableProfessors: [],
      validationErrors: {},
    }
  },
  methods: {
    async onSubmit(){
      const gradebook = {
        name: this.name,
        professor_id: this.professor_id,
      }
      try {
        await gradebookService.createGradebook(gradebook);
        this.$router.push('/');
      } catch (error) {
        console.dir(error);
        if (error.response) {
          if (error.response.status === 422) {
            this.validationErrors = {};
            this.validationErrors = Object.assign({}, {}, error.response.data.errors);
          } 
        } else {
          console.dir(error);
        }
      }
    }
  },
  async created(){
    try {
      const response = await professorService.getAvaliableProfessors();
      this.availableProfessors = response.data;
    } catch (error) {
      alert(`There was an error during getting all available professors.\nError: ${error.response.statusText}`);
    }
  }
}
</script>