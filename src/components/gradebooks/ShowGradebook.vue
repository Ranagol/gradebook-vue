<template>
  <div>
    <p>ShowGradebook</p>
    <div class="jumbotron">
      <h3 class="display-6">Gradebook: {{ gradebook.name }}</h3>
      <p class="lead">Professor: <router-link :to="`/professors/${gradebook.professor.id}`" class="link">{{ gradebook.professor.first_name }} {{gradebook.professor.last_name }}</router-link></p>
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
    </div>
  </div>
</template>


<script>
import gradebookService from '../../service/gradebookService';
export default {
  name: 'ShowGradebook',
  data(){
    return {
      gradebook: {},
    }
  },
  computed: {
    comments(){
      const comments = this.gradebook.comments;
      return comments;
    }
  },
  
  async created(){
    this.gradebook = await gradebookService.getGradebookById(this.$route.params.id);
  }
}
</script>