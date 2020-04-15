<template>
  <div>
    
    <p>ShowGradebook</p>

    <div class="jumbotron">
      <div class="d-flex flex-row justify-content-between">
        <button @click="goToAddStudent" class="btn btn-success">Add new student</button>
        <button @click="deleteGradebook(gradebook.id)" class="btn btn-danger">Delete gradebook</button>
      </div>
      <h3 class="display-6 top-margin" >Gradebook: {{ gradebook.name }}</h3>

      <div class="d-flex flex-row justify-content-between">
        <p class="lead">Professor: 
          <router-link :to="`/professors/${gradebook.professor.id}`" class="link">
            {{ gradebook.professor.first_name }} 
            {{gradebook.professor.last_name }}
          </router-link>
        </p>
      </div>

      <hr class="my-4">
      <h5>Student list:</h5>
      <ol>
        <li v-for="student in gradebook.students" :key="student.id">{{ student.first_name }} {{ student.last_name }}</li>
      </ol>

      <h5>Comments</h5>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <strong>
            {{ comment.user.first_name }} 
            {{ comment.user.last_name }} 
          </strong>
          commented: 
          {{comment.content}}
        </li>
      </ul>

      <div>
        <h5>Add new comment:</h5>

        <div class="alert alert-danger" v-for="(validationError, fieldName) in validationErrors" :key="`validation-errors-${fieldName}`">
          {{ `${fieldName}: ${validationError[0]}` }}
        </div>



        <form @submit.prevent="createNewComment">
          <textarea class="form-control" name="content" v-model="content"  rows="3"></textarea>
          <button class="btn btn-warning " type="submit">Submit comment</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import gradebookService from '../../service/gradebookService';
import commentService from '../../service/commentService';
export default {
  name: 'ShowGradebook',
  data(){
    return {
      gradebook: {},
      counter: 0,
      content: '',
      gradebookId: this.$route.params.id,
      validationErrors: {},
      
    }
  },
  methods: {

    async createNewComment(){
      const comment = {
        content: this.content,
      }
      try {
        const response = await commentService.createComment(comment, this.gradebookId);
        const createdComment = response.data;
        this.gradebook.comments.push(createdComment);
        this.content = '';
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






    async deleteGradebook(id){
      await gradebookService.deleteGradebook(id);
      console.log('Gradebook deleted');
      this.$router.push('/');
    },

    goToAddStudent(){
      this.$router.push(`/gradebooks/${this.gradebookId}/students/create`);
    }
  },
  computed: {
    comments(){
      const comments = this.gradebook.comments;
      return comments;
    }
  },
  async created(){
    console.dir(this.$route.path);
    if (this.$route.path == '/my-gradebook') {
      this.gradebook = await gradebookService.getMyGradebook();
    } else {
      this.gradebook = await gradebookService.getGradebookById(this.gradebookId);
    }
    console.dir(this.gradebook);
    
  }
}
</script>

<style scoped>
.top-margin{
  margin-top: 30px;
}
</style>