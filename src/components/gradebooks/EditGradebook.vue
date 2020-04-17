<template>
  <div>
    <app-add-gradebook></app-add-gradebook>
    <app-add-student></app-add-student>

  </div>
</template>

<script>
import AddGradebook from './AddGradebook';
import AddStudent from '../students/AddStudent';
export default {
  name: 'EditGradebook',
  components: {
    'app-add-gradebook': AddGradebook,
    'app-add-student': AddStudent,
  },

}
</script>