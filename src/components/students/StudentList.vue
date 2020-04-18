<template>
  <div>
    <!-- Student displaying -->
    <h5>Student list:</h5>

    <div v-if="students !== undefined && students.length > 0">
      <ol>
        <li v-for="student in students" :key="student.id">{{ student.first_name }} {{ student.last_name }}</li>
      </ol>
    </div>
    <div v-else>
      <p>This gradebook has no students yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentList',
  props: ['students']
}
</script>