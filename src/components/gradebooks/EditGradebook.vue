<template>
  <div>
    <h1>THIS PAGE IS CURRENTLY OUT OF ORDER. PLEASE COME BACK LATER.</h1>
    <app-add-gradebook :gradebook = 'gradebook'></app-add-gradebook>
    <app-student-list></app-student-list>
    <app-add-student></app-add-student>
  </div>
</template>

<script>
import AddGradebook from './AddGradebook';
import AddStudent from '../students/AddStudent';
import StudentList from '../students/StudentList'
//import gradebookService from '../../service/gradebookService';
export default {
  name: 'EditGradebook',
  components: {
    'app-add-gradebook': AddGradebook,
    'app-add-student': AddStudent,
    'app-student-list': StudentList,
  },
  data(){
    return {
      goBackHere:'',
      gradebook: {},
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
  methods: {
    onSubmit(){
      
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      //this.goBackHere is the path where the user should be returned after the editing
      vm.goBackHere = from.path;
    })
  },

  async created(){
    
    
  }

}
</script>