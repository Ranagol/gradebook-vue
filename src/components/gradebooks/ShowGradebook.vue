<template>
  <div>
    
    <p>ShowGradebook</p>

    <div class="jumbotron">
      <div class="d-flex flex-row justify-content-between">
        <button @click="goToAddStudent" class="btn btn-success">Add new student</button>
        <button @click="deleteGradebook(gradebook.id)" class="btn btn-danger">Delete gradebook</button>
      </div>
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
      <h5>Student list:</h5>
      <div v-if="gradebook.students !== undefined && gradebook.students.length > 0">
        <ol>
          <li v-for="student in gradebook.students" :key="student.id">{{ student.first_name }} {{ student.last_name }}</li>
        </ol>
      </div>
      <div v-else>
        <p>This gradebook has no students yet.</p>
      </div>
      

      <!-- Comment displaying -->
      <h5>Comments</h5>
      <div v-if="comments !== undefined && comments.length > 0"><!-- if there are comments, then show them... -->
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
      </div>
      <div v-else><!-- ...but if there are no comments, then show this: -->
        <p>No comments yet. Add a comment!</p>
      </div>
      
      <!-- Comment creating -->
      <div v-if="!commentCreated">
        <h5>Add new comment:</h5>

        <!-- Comment error displaying -->
        <div class="alert alert-danger" v-for="(validationError, fieldName) in validationErrors" :key="`validation-errors-${fieldName}`">
          {{ `${fieldName}: ${validationError[0]}` }}
        </div>

        <!-- Comment creating -->
        <form  @submit.prevent="createNewComment">
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
      gradebookId: this.$route.params.id || 0,
      validationErrors: {},
      commentCreated: false,
      
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
      return comments;//TODO LOSI- EZ ITT CSAK KERDES: EZ MIERT KELL????
    },
    professor() {
      const professor = this.gradebook.professor || {};//TODO LOSI- EZ ITT CSAK KERDES: EZZEL AZ URES {} AZT ERJUK EL, HOGY NEM HUJUL BE A VUE HA NINCS PROFESSOR OBJECT LEKULDVE AZ APIBOL???
      return professor;
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