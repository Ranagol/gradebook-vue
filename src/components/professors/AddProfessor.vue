<template>
  <div>
  <form @submit.prevent="onSubmitProf">
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

    <!-- SELECT GRADEBOOK -->
      <div class="form-group">
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
    }
  },
  methods: {
    async onSubmitProf(){
      const bodyProf = {
        first_name: this.first_name,
        last_name: this.last_name,
        picture_urls: this.picture_urls,
        gradebook_id: this.gradebook_id,
      }
      await professorService.createProfessor(bodyProf);
      console.log('Uspesno kreiran professor i professor picture');
      this.$router.push('/professors');
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
    this.availableGradebooks = await gradebookService.getAvaliableGradebooks();
    console.dir(this.availableGradebooks);
   
    //mikor professort krealok es gradebookot akarok hozzacsatolni, akkor a gradebookban nem jelenik meg a professor_id
  }
  
  
}
</script>