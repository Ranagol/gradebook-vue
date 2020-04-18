<template>
  <div>
    
    <div class="jumbotron">
      <div v-if="!isEmptyObject(gradebook)" class="d-flex flex-row justify-content-between">
        <button @click="goToAddStudent" class="btn btn-success">Add new student</button>
        <button @click="goToEditGradebook(gradebook.id)" class="btn btn-warning">Edit gradebook</button>
        <button @click="deleteGradebook(gradebook.id)" class="btn btn-danger">Delete gradebook</button>
      </div>

      <!-- If there is no data in the db... -->
      <div v-if="isEmptyObject(gradebook)" class="alert alert-info">
        <h5>There is no data.</h5>
      </div>

      <!-- Loading displaying -->
      <h3 v-if="loading" class="alert alert-warning">
        Loading...
      </h3>
     
      <h3 class="display-6 top-margin" >Gradebook: {{ gradebook.name }}</h3>

      <!-- Professor displaying -->
      <div v-if="gradebook.professor !==undefined && gradebook.professor !==null ">
        <p class="lead">Professor: 
          <router-link :to="`/professors/${professor.id}`" class="link">
            {{ professor.first_name }} 
            {{ professor.last_name }}
          </router-link>
        </p>
      </div>
      <div v-else>
        <p>This gradebook currently does not have a professor.</p>
      </div>

      <hr class="my-4">

      <!-- Student displaying -->
      <app-student-list :students = 'students' ></app-student-list>



  
      

      <!-- Comment displaying -->
      <h5>Comments</h5>
      <div v-if="comments !== undefined && comments.length > 0">
        <ul>
          <li v-for="(comment, index) in comments" :key="comment.id">
            <strong>
              {{ comment.user.first_name }} 
              {{ comment.user.last_name }} 
            </strong>
            commented: 
            {{comment.content}}

            <!-- Comment deleting part -->
            <div class="d-flex flex-row justifiy-content-start bottom-margin" v-if="canUserDeleteComment(comment.user_id)">
              <button @click="deleteComment(comment.id, index)" class="btn btn-danger">Delete comment</button>
            </div>

          </li>
        </ul>
      </div>
      <div v-else>
        <p>No comments yet. Add a comment!</p>
      </div>
      
      <!-- Comment creating -->
      <div v-if="!commentCreated">
        <h5 v-if="!isEmptyObject(gradebook)" >Add new comment:</h5>

        <!-- Comment error displaying -->
        <div class="alert alert-danger" v-for="(validationError, fieldName) in validationErrors" :key="`validation-errors-${fieldName}`">
          {{ `${fieldName}: ${validationError[0]}` }}
        </div>

        <!-- Comment creating -->
        <form v-if="!isEmptyObject(gradebook)" @submit.prevent="createNewComment">
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
import StudentList from '../students/StudentList';
export default {
  name: 'ShowGradebook',
  components: {
    'app-student-list': StudentList
  },

  data(){
    return {
      gradebook: {},
      counter: 0,
      content: '',
      gradebookId: this.$route.params.id || 0,
      validationErrors: {},
      commentCreated: false,
      loading: false,
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
        this.commentCreated = true;
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

    isEmptyObject(gradebook){
      if (Object.entries(gradebook).length === 0) {
        return true;
      } else {
        return false;
      }
    },

    async deleteGradebook(id){
      if (confirm('Are you sure that you want to delete this gradebook?')) {
        try {
          await gradebookService.deleteGradebook(id);
          this.$router.push('/');
        } catch (error) {
          console.dir(error);
          alert(`There was an error during delete.\nError: ${error.response.data.message}`);
        }
      }
    },

    goToAddStudent(){
      this.$router.push(`/gradebooks/${this.gradebookId}/students/create`);
    },

    goToEditGradebook(gradebookId){
      this.$router.push(`/gradebooks/${gradebookId}/edit`);
    },

    async deleteComment(id, index){
      if (confirm('Are you sure that you want to delete this commet?')) {
        try {
          await commentService.deleteComment(id);
          this.comments.splice(index, 1);
        } catch (error) {
          alert(error.response.data.message);
        }
      }
    },

    canUserDeleteComment(commentAuthorId){
      const currentUserId = window.localStorage.getItem('user_id');
      if (currentUserId == commentAuthorId) {
        return true
      } else {
        return false
      }
    }
  },

  computed: {
    comments(){
      const comments = this.gradebook.comments || [];
      return comments;
    },
    professor() {
      const professor = this.gradebook.professor || {};
      return professor;
    },
    students(){
      const students = this.gradebook.students || {};
      return students;
    }
  },

  // is the user aiming for '/my-gradebook' or for the '/gradebooks/:id'?
  async created(){
    this.loading = true;
    console.dir(this.$route.path);
    if (this.$route.path == '/my-gradebook') {
      try {
        this.gradebook = await gradebookService.getMyGradebook();
        this.gradebookId = this.gradebook.id;
      } catch (error) {
        console.dir(error);
        alert(`There was an error getting my-gradbook from db.\nError: ${error.response.data.message}`);
      }
    } else {
      try {//TODO LOSI problema: nincs hibakijelzes, ha 3000 teszek be id helyett
        const response = await gradebookService.getGradebookById(this.gradebookId);
        this.gradebook = response.data;
      } catch (error) {
        console.dir(error);
        alert(`There was an error getting the selected single-gradebook from db.\nError: ${error.response.data.message}`);
      }
    }
    this.loading = false;
    console.dir(this.gradebook);
  }
}
</script>

<style scoped>
.top-margin{
  margin-top: 30px;
}

.bottom-margin{
  margin-bottom: 20px;
}
</style>