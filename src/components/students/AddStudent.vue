<template>
  <div>
    <h3>Add new student:</h3>
  <form @submit.prevent="onSubmit">
  
    <!-- FIRST NAME -->
    <div class="form-group row">
      <label for="first_name" class="col-4 col-form-label">First Name</label>
      <div class="col-8">
        <div class="input-group">
          <input
            id="first_name"
            name="first_name"
            type="text"
            required="required"
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
            required="required"
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
            required="required"
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
    }
  },
  methods: {
    async onSubmit(){
      const student = {
        first_name: this.first_name,
        last_name: this.last_name,
        url_slika: this.url_slika
      }
      await studentService.createStudent(student, this.gradebook_id);
      alert('Student created');
    }
  },
  
}
</script>