<template>
  <div>
    <h3>Add new student:</h3>
  <form @submit.prevent="onSubmit">

    <div class="alert alert-danger" v-for="(validationError, fieldName) in validationErrors" :key="`validation-errors-${fieldName}`">
      {{ `${fieldName}: ${validationError[0]}` }}<!--fieldName = first_name. validationError[0] = the actual error. [0]=because sometimes there could be some not needed additional garbage, but under [0] is always the error message that we need. -->
    </div>
  
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
      validationErrors: {},//the validation error will be an object
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
      } catch (error) {
        console.dir(error);//this is just for us, to understand the error property structure
        if (error.response) {//if there is an error response from api...
          if (error.response.status === 422) {//...and it's status is 422
            this.validationErrors = {};//empty the validationError
            this.validationErrors = Object.assign({}, {}, error.response.data.errors);//We use Object.assign, because this way Vue can recognise that this object has changed, and will react. Object assign, please create an empty {}, merge the second empty {} with error.response.data.errors, put it into the first empty {}, and after this, put all this into this.validationErrors)
          } else if (error.response.status === 400) {//in case if we expect from api an error with a different status than the previous 422 status
            //do something...
          }
        } else {
          console.dir(error);//this is for a case when we have an error not from the api, but from Vue...
        }
      }
      
    }
  },
  
}
</script>