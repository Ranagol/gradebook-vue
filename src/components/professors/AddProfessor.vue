<template>
  <div>
  <form @submit.prevent="onSubmitProf">

    <!-- VALIDATION ERROR DISPLAY -->
    <div class="alert alert-danger" v-for="(validationError, fieldName) in validationErrors" :key="`validation-errors-${fieldName}`">
      {{ `${fieldName}: ${validationError[0]}` }}
    </div>
    
    <p>AddProfessor</p>
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
            minlength="1"
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
            minlength="1"
          />
        </div>
      </div>
    </div>


    
    <!-- WHEN THERE ARE NO AVAILABLE GRADEBOOKS -->
    <div v-if="!availableGradebooks.length" class="alert alert-info">
      <h5>Currently there are no available gradebooks, that could be assigned to this professor.</h5>
    </div>

    <!-- SELECT GRADEBOOK -->
    <div v-if="availableGradebooks.length" class="form-group">
      <label for="gradebook">Assign this professor to a gradebook:</label>
      <select class="form-control" v-model="gradebook_id" id="gradebook">
        <option selected value="">Do not assign</option>
        <option v-for="gradebook in availableGradebooks" :key="gradebook.id" :value="gradebook.id">{{ gradebook.name }}</option> -->
      </select>
    </div>
      
    <!-- PICTURE -->
    <button class="btn btn-success" @click="addImageUrl">Add Image URL</button>
    <div class="form-group row">
      <picture-url-input 
        required
        v-for="(picture_url, index) in picture_urls"
        :key="`picture-url-input-${picture_urls[index].index}`"
        v-model="picture_urls[index].url"
        @deleteUrl="deleteUrl(index)"
      />
    </div>

    <!-- SUBMIT -->
    <div class="form-group row">
      <div class="offset-4 col-8">
        <button name="submit" type="submit" class="btn btn-primary">Submit</button>
        <button class="btn btn-danger" @click="this.$router.push('/professors')">Cancel</button>
      </div>
    </div>

  </form>
  </div>
</template>

<script>
import PictureUrlInput from './PictureUrlInput';
import professorService from '../../service/professorService';
import gradebookService from '../../service/gradebookService';
export default {

  name: 'AddProfessor',
  components: {
    PictureUrlInput,
  },
  data(){
    return{
      first_name:'',
      last_name:'',
      picture_urls: [],
      pictureUrlCount: 0,
      availableGradebooks: [],
      gradebook_id:'',
      validationErrors: {},
    }
  },
  methods: {
    async onSubmitProf(){
      if (this.picture_urls.length == 0) {
        alert('Neophodno je dodati barem jednu sliku.');
        return;
      }
      const bodyProf = {
        first_name: this.first_name,
        last_name: this.last_name,
        picture_urls: this.picture_urls,
        gradebook_id: this.gradebook_id,
      }
      try {
        await professorService.createProfessor(bodyProf);
        this.$router.push('/professors');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            this.validationErrors = {};
            this.validationErrors = Object.assign({}, {}, error.response.data.errors);
          } else {
          console.dir(error);
          }
        }
      }
    },

    addImageUrl() {
      this.picture_urls.push(
        {
          url: '',
          index: this.pictureUrlCount
        }
      );
      this.pictureUrlCount++;
    },

    deleteUrl(index) {
      this.picture_urls.splice(index, 1);
    },

  },
  async created(){
    try {
      const response = await gradebookService.getAvaliableGradebooks();
      this.availableGradebooks = response.data
    } catch (error) {
      alert(`There was an error during getting all available gradebooks.\nError: ${error.response.statusText}`);
    }
  }
}
</script>