<template>
  <div>
    <h3>Add new student:</h3>
  <form @submit.prevent="onSubmit">

    <div class="alert alert-danger" v-for="(validationError, fieldName) in validationErrors" :key="`validation-errors-${fieldName}`">
      {{ `${fieldName}: ${validationError[0]}` }}
    </div>
    <!-- LOSI TODO MAXLENGTH ITT SE DOLGOZIK -->
    <!-- FIRST NAME -->
    <div class="form-group row">
      <label for="first_name" class="col-4 col-form-label">First Name</label>
      <div class="col-8">
        <div class="input-group">
          <input
            id="first_name"
            name="first_name"
            type="text"
            class="form-control here"
            v-model="first_name"
            required
          />
        </div>
      </div>
    </div>

    <!-- LAST NAME -->
    <div class="form-group row">
      <label for="last_name" class="col-4 col-form-label">Last Name</label>
      <div class="col-8">
        <div class="input-group">
          <input
            id="last_name"
            name="last_name"
            type="text"
            class="form-control here"
            v-model="last_name"
            required
          />
        </div>
      </div>
    </div>

    <!-- PICTURE -->
    <div class="form-group row">
      <label for="url_slika" class="col-4 col-form-label">Picture url</label>
      <div class="col-8">
        <div class="input-group">
          <input
            id="url_slika"
            name="url_slika"
            type="text"
            class="form-control here"
            v-model="url_slika"
            required
          />
        </div>
      </div>
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
import studentService from '../../service/studentService';
export default {
  name: 'AddStudent',
  data(){
    return {
      first_name:'',
      last_name:'',
      url_slika:'',
      gradebook_id: this.$route.params.id,
      validationErrors: {},
      goBackHere:'',
    }
  },
  methods: {
    async onSubmit(){
      const student = {
        first_name: this.first_name,
        last_name: this.last_name,
        url_slika: this.url_slika
      }
      try {
        await studentService.createStudent(student, this.gradebook_id);
        this.$router.push(this.goBackHere);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            this.validationErrors = {};
            this.validationErrors = Object.assign({}, {}, error.response.data.errors);
          } else if (error.response.status === 400) {
            console.dir(error.response);
          }
        } else {
          console.dir(error);
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.goBackHere = from.path;
    })
  }
}
</script>